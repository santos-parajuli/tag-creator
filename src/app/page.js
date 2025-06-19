'use client';
import * as XLSX from 'xlsx';
import { useEffect, useState } from 'react';
import FabricSelector from '@/components/FabricSelector';
import Tag from '@/components/Tag';

const EXCEL_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQswNRNsPud0BG-tP7CIOq6-didpSDdRkzojx0HQJC4Y2A_V450NffzCzNnmAYte7oRNlEUHRngG27U/pub?output=xlsx';

export default function Home() {
  const [fabrics, setFabrics] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [labelType, setLabelType] = useState('Multi-Use');

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
    if (usage.includes('Pillow')) types.push('Multi-Use, Pillow Only');
    if (types.length === 0) types.push('Multi-Use');
    return types;
  };

  const handleSelectFabric = (fabric) => {
    if (selectedFabrics.length < 3 && !selectedFabrics.some(f => f.fabric === fabric.fabric && f.color === fabric.color)) {
      setSelectedFabrics([...selectedFabrics, fabric]);
    }
  };

  const handleRemoveFabric = (index) => {
    const updated = [...selectedFabrics];
    updated.splice(index, 1);
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
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Selected Fabrics:</h3>
          <ul className="space-y-2">
            {selectedFabrics.map((fabric, index) => (
              <li key={`${fabric.fabric}-${fabric.color}-${index}`} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>{fabric.fabric} - {fabric.color}</span>
                <button 
                  onClick={() => handleRemoveFabric(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Label Type Selection */}
      <div className='my-4'>
        <label htmlFor='labelType' className='block text-sm font-medium text-gray-700 mb-1'>
          Label Type:
        </label>
        <select 
          id='labelType' 
          value={labelType} 
          onChange={(e) => setLabelType(e.target.value)} 
          className='border border-gray-300 rounded px-3 py-1 text-sm'
        >
          <option value='Multi-Use'>Multi-Use</option>
          <option value='High Performance'>High Performance</option>
          <option value='Indoor/Outdoor'>Indoor/Outdoor</option>
          <option value='Drapery'>Drapery</option>
          <option value='Velvet'>Velvet</option>
        </select>
      </div>

      {/* Tags for Printing */}
      <div className="space-y-4">
        {selectedFabrics.map((fabric, index) => (
          <div key={`tag-${index}`} className="page-break">
            <Tag fabric={fabric} labelType={labelType} />
          </div>
        ))}
      </div>

      {/* Print Button */}
      {selectedFabrics.length > 0 && (
        <button
          onClick={() => window.print()}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Print Tags
        </button>
      )}
    </div>
  );
}
