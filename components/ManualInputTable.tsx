import React from 'react';
import { SurveyRow } from '../types';
import { nanoid } from 'nanoid';

interface ManualInputTableProps {
    rows: SurveyRow[];
    setRows: React.Dispatch<React.SetStateAction<SurveyRow[]>>;
}

export const ManualInputTable: React.FC<ManualInputTableProps> = ({ rows, setRows }) => {

    const handleInputChange = (id: string, field: keyof Omit<SurveyRow, 'id' | 'HI'>, value: string) => {
        const newRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setRows(newRows);
    };

    const addRow = () => {
        const newRow: SurveyRow = {
            id: nanoid(), BS: '', FS: '', RL: '', HI: null
        };
        setRows([...rows, newRow]);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th colSpan={4} className="title-cell">RL Calculation by HI Method</th>
                    </tr>
                    <tr>
                        <th>BS</th>
                        <th>FS</th>
                        <th>HI</th>
                        <th>RL</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.id}>
                            <td><input type="number" step="0.001" value={row.BS} onChange={(e) => handleInputChange(row.id, 'BS', e.target.value)} /></td>
                            <td><input type="number" step="0.001" value={row.FS} onChange={(e) => handleInputChange(row.id, 'FS', e.target.value)} /></td>
                            <td>
                                {row.HI !== null 
                                    ? <div className="calculated-cell h-full">{row.HI.toFixed(3)}</div>
                                    : null
                                }
                            </td>
                            <td>
                                 <input type="number" step="0.001" value={row.RL} onChange={(e) => handleInputChange(row.id, 'RL', e.target.value)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-2">
                <button onClick={addRow} className="w-full text-sm py-1 px-2 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-all">
                    + Add Row
                </button>
            </div>
        </div>
    );
};