'use client';

import * as XLSX from 'xlsx';

import { useEffect, useState } from 'react';

import FabricSelector from '@/components/FabricSelector';
import Tag from '@/components/Tag';

const EXCEL_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQswNRNsPud0BG-tP7CIOq6-didpSDdRkzojx0HQJC4Y2A_V450NffzCzNnmAYte7oRNlEUHRngG27U/pub?output=xlsx';
export default function Home() {
	const [fabrics, setFabrics] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [labelType, setLabelType] = useState('Multi-Use');

	useEffect(() => {
		fetch(EXCEL_URL)
			.then((res) => res.arrayBuffer())
			.then((ab) => {
				const workbook = XLSX.read(ab, { type: 'array' });
				const sheet = workbook.Sheets[workbook.SheetNames[0]];
				const data = XLSX.utils.sheet_to_json(sheet);

				// Transform data to match expected format
				const transformedData = data.map((row) => ({
					fabric: row.Name,
					color: row.Color,
					content: row.Content,
					width: row.Width,
					rubs: row['Double Rubs'],
					usage: row.Usage,
					URL:row.URL,
					// Parse usage to determine available label types
					labelTypes: parseUsageToLabelTypes(row.Usage),
				}));

				setFabrics(transformedData);
			});
	}, []);

	// Parse the Usage field to determine available label types
	const parseUsageToLabelTypes = (usage) => {
		const types = [];

		if (usage.includes('Drapery')) types.push('Drapery');
		if (usage.includes('High Performance')) types.push('High Performance');
		if (usage.includes('Outdoor')) types.push('Indoor/Outdoor');
		if (usage.includes('Pillow')) types.push('Multi-Use, Pillow Only');

		// Default to Multi-Use if no specific types found
		if (types.length === 0) types.push('Multi-Use');

		return types;
	};
	const selectedFabric = selectedIndex !== null ? fabrics[selectedIndex] : null;

	return (
		<div>
			<FabricSelector fabrics={fabrics} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />

			{/* Label Type Selection */}
			<div className='my-4'>
				<label htmlFor='labelType' className='block text-sm font-medium text-gray-700 mb-1'>
					Label Type:
				</label>
				<select id='labelType' value={labelType} onChange={(e) => setLabelType(e.target.value)} className='border border-gray-300 rounded px-3 py-1 text-sm'>
					<option value='Multi-Use'>Multi-Use</option>
					<option value='High Performance'>High Performance</option>
					<option value='Indoor/Outdoor'>Indoor/Outdoor</option>
					<option value='Drapery'>Drapery</option>
					<option value='Velvet'>Velvet</option>
	
				</select>
			</div>
			{selectedFabric && <Tag fabric={selectedFabric} labelType={labelType} />}
		</div>
	);
}
