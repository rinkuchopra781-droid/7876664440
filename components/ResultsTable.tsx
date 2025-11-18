import React from 'react';
// FIX: Use SurveyRow type which is defined and aligns with the app's data structure.
import { SurveyRow } from '../types';

interface ResultsTableProps {
    data: SurveyRow[];
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
    
    const formatValue = (value: number | null | string) => {
        if (typeof value === 'number') {
            return value.toFixed(3);
        }
        if (typeof value === 'string' && !isNaN(parseFloat(value))) {
             return parseFloat(value).toFixed(3);
        }
        return value || '—';
    };
    
    return (
        <div className="bg-slate-800/50 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
            <h2 className="text-xl font-bold p-4 border-b border-slate-700 text-white">Calculation Results</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-800">
                        <tr>
                            <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-slate-300">B.S.</th>
                            <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-slate-300">F.S.</th>
                            <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-slate-300 text-cyan-400">H.I.</th>
                            <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-slate-300 text-cyan-400">R.L.</th>
                            <th scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-slate-300">Note</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                        {/* FIX: Use row.id for key and display BS, IS, FS fields. */}
                        {data.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-800 transition-colors">
                                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-300">{row.BS}</td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-300">{row.FS}</td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm font-mono text-cyan-300">{formatValue(row.HI)}</td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm font-mono text-cyan-300">{formatValue(row.RL)}</td>
                                <td className="px-4 py-4 text-sm text-slate-400 max-w-xs truncate">{row.Note}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};