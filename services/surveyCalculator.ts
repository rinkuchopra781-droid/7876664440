import { SurveyRow } from '../types';

export const calculateLevels = (rows: SurveyRow[]): SurveyRow[] => {
    const results: SurveyRow[] = JSON.parse(JSON.stringify(rows));
    results.forEach(r => { 
        r.HI = null; 
        // Don't clear RLs if they were user-input
    });


    let currentHI: number | null = null;
    let startRl: number | null = null;
    
    // Find starting RL
    const startingRow = results.find(row => row.RL && !isNaN(parseFloat(row.RL)));
    if (!startingRow) {
        throw new Error('Please enter a starting RL for your benchmark (BM).');
    }
    startRl = parseFloat(startingRow.RL);


    // Loop through and calculate
    for (let i = 0; i < results.length; i++) {
        const row = results[i];
        
        const bs = parseFloat(row.BS);
        const fs = parseFloat(row.FS);
        const rl = parseFloat(row.RL);

        // If there is a BS, calculate a new HI
        if (!isNaN(bs)) {
            let prevRl: number | null = null;

            // Find the RL to use for this BS. It could be in the same row or a previous row.
            if (!isNaN(rl)) {
                prevRl = rl;
            } else {
                 // Look backwards for the last calculated RL
                for (let j = i - 1; j >= 0; j--) {
                    const prevRowRl = parseFloat(results[j].RL);
                    if (!isNaN(prevRowRl)) {
                        prevRl = prevRowRl;
                        break;
                    }
                }
            }
             
            if (prevRl === null) {
                // If we are at the very first row and it has a BS but no RL.
                if (i === 0) throw new Error(`Row ${i + 1}: Starting benchmark must have an RL value.`);
                // If it's a new setup but the previous foresight didn't calculate an RL
                throw new Error(`Row ${i + 1}: Cannot calculate HI without a previous RL. Check for a missing Foresight.`);
            }
            
            currentHI = prevRl + bs;
        }

        // Use currentHI to calculate RLs for FS
        if (currentHI !== null) {
            row.HI = parseFloat(currentHI.toFixed(3));
            
            if (!isNaN(fs)) {
                const calculatedRl = currentHI - fs;
                row.RL = calculatedRl.toFixed(3);
                // After a foresight, the instrument station changes, so HI is no longer valid.
                currentHI = null; 
            }
        }
    }

    return results;
};