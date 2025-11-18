import React, { useState, useCallback } from 'react';
import { SurveyRow } from './types';
import { calculateLevels } from './services/surveyCalculator';
import { ManualInputTable } from './components/ManualInputTable';
import { nanoid } from 'nanoid';

const createInitialRows = (): SurveyRow[] => [
    { id: nanoid(), BS: '1.5', FS: '', HI: null, RL: '100' },
    { id: nanoid(), BS: '', FS: '2.0', HI: null, RL: '' },
    { id: nanoid(), BS: '1.2', FS: '', HI: null, RL: '' },
    { id: nanoid(), BS: '', FS: '1.8', HI: null, RL: '' },
    ...Array.from({ length: 5 }, () => ({ id: nanoid(), BS: '', FS: '', HI: null, RL: '' })),
];

const createEmptyRows = (count = 9): SurveyRow[] => 
    Array.from({ length: count }, () => ({ id: nanoid(), BS: '', FS: '', HI: null, RL: '' }));


const App: React.FC = () => {
    const [surveyRows, setSurveyRows] = useState<SurveyRow[]>(createInitialRows());
    const [error, setError] = useState<string | null>(null);

    const handleCalculate = useCallback(() => {
        setError(null);
        try {
            const results = calculateLevels(surveyRows);
            setSurveyRows(results);
        } catch (e: any) {
            setError(e.message);
        }
    }, [surveyRows]);

    const handleReset = () => {
        setSurveyRows(createEmptyRows());
        setError(null);
    }

    const handleDownload = () => {
        const headers = ['BS', 'FS', 'HI', 'RL'];
        const csvRows = [headers.join(',')];

        surveyRows.forEach(row => {
            const bs = row.BS || '';
            const fs = row.FS || '';
            const hi = row.HI !== null ? row.HI.toFixed(3) : '';
            const rl = row.RL || '';
            csvRows.push([bs, fs, hi, rl].join(','));
        });

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'survey_results.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="app-container">
            <main>
                <ManualInputTable rows={surveyRows} setRows={setSurveyRows} />
                
                <div className="mt-6 flex justify-between items-center">
                    <div className="font-mono text-sm text-gray-600">
                        <p><strong>HI</strong> = RL + BS</p>
                        <p><strong>RL</strong> = HI - FS</p>
                    </div>

                    <div>
                        <button 
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md mr-2"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                        <button
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md mr-2"
                            onClick={handleDownload}
                        >
                            Download CSV
                        </button>
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md shadow-md"
                            onClick={handleCalculate}
                        >
                            Calculate RLs
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;