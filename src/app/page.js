'use client';
import * as XLSX from 'xlsx';
import { useEffect, useState } from 'react';
import FabricSelector from '@/components/FabricSelector';
import Tag from '@/components/Tag';

const EXCEL_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQswNRNsPud0BG-tP7CIOq6-didpSDdRkzojx0HQJC4Y2A_V450NffzCzNnmAYte7oRNlEUHRngG27U/pub?output=xlsx';

export default function Home() {
  const [fabrics, setFabrics] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);

  useEffect(() => {
    fetch(EXCEL_URL)
      .then((res) => res.arrayBuffer())
      .then((ab) => {
        const workbook = XLSX.read(ab, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);

        const transformedData = data.map((row) => ({
          fabric: row.Name,
          color: row.Color,
          content: row.Content,
          width: row.Width,
          rubs: row['Double Rubs'],
          usage: row.Usage,
          URL: row.URL,
          labelTypes: parseUsageToLabelTypes(row.Usage),
        }));

        setFabrics(transformedData);
      });
  }, []);

  const parseUsageToLabelTypes = (usage) => {
    const types = [];
    if (usage.includes('Drapery')) types.push('Drapery');
    if (usage.includes('High Performance')) types.push('High Performance');
    if (usage.includes('Outdoor')) types.push('Indoor/Outdoor');
    if (usage.includes('Pillow')) types.push('Pillow Only');
    types.push('Multi-Use'); // Always available
    return types;
  };

  const handleSelectFabric = (fabric) => {
    if (selectedFabrics.length < 3 && !selectedFabrics.some(f => f.fabric === fabric.fabric && f.color === fabric.color)) {
      setSelectedFabrics([...selectedFabrics, {
        ...fabric,
        selectedLabelType: fabric.labelTypes[0] // Set first available type as default
      }]);
    }
  };

  const handleRemoveFabric = (index) => {
    const updated = [...selectedFabrics];
    updated.splice(index, 1);
    setSelectedFabrics(updated);
  };

  const handleLabelTypeChange = (index, newType) => {
    const updated = [...selectedFabrics];
    updated[index].selectedLabelType = newType;
    setSelectedFabrics(updated);
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <FabricSelector 
          fabrics={fabrics} 
          onSelect={handleSelectFabric}
          disabled={selectedFabrics.length >= 3}
        />
        <p className="text-sm text-gray-500 mt-1">
          {selectedFabrics.length}/3 fabrics selected
        </p>
      </div>

      {/* Selected Fabrics List */}
      {selectedFabrics.length > 0 && (
        <div className="mb-6 space-y-4">
          <h3 className="text-sm font-medium">Selected Fabrics:</h3>
          {selectedFabrics.map((fabric, index) => (
            <div key={`selected-${index}`} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{fabric.fabric} - {fabric.color}</span>
                <button 
                  onClick={() => handleRemoveFabric(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center">
                <label className="text-sm mr-2">Label Type:</label>
                <select
                  value={fabric.selectedLabelType}
                  onChange={(e) => handleLabelTypeChange(index, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  {fabric.labelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

       <div className="tags-container non-printable">
        {selectedFabrics.map((fabric, index) => (
          <div key={`tag-${index}`} className="print-tag">
            <Tag fabric={fabric} labelType={fabric.selectedLabelType} />
          </div>
        ))}
      </div>

       {selectedFabrics.length > 0 && (
        <button
          onClick={() => window.print()}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded non-printable"
        >
          Print Tags
        </button>
      )}

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .tags-container, 
          .tags-container *,
          .print-tag,
          .print-tag * {
            visibility: visible;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .tags-container {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
          }
          
          .print-tag {
            display: block;
            margin-bottom: 0 !important;
          }
          
          .non-printable {
            display: none;
          }
        }
        
        /* Regular screen styles */
        .tags-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .print-tag {
          border: 1px dashed #ccc; /* Visual guide for screen */
        }
      `}</style>
    </div>
  );
}
