//Number of drawn matches - Hackerrank

const axios = require("axios");

const api = "https://jsonmock.hackerrank.com/api/";

async function getNumDraws(year) {
    try {
        // Step 1: Fetch the total number of pages
        const initialResponse = await axios.get(`${api}football_matches?year=${year}`);
        const total_pages = initialResponse.data.total_pages || 1;
        
        // Step 2: Create an array of promises to fetch draw counts for all pages concurrently
        const promises = [];
        for (let page = 1; page <= total_pages; page++) {
            promises.push(
                axios.get(`${api}football_matches?year=${year}&page=${page}`)
                    .then(response => {
                        // Count draws in the current page's data
                        const data = response.data.data;
                        let count = 0;
                        data.forEach(match => {
                            if (match.team1goals === match.team2goals) {
                                count++;
                            }
                        });
                        return count;
                    })
                    .catch(error => {
                        console.error(`Error fetching data for page ${page}: ${error.message}`);
                        return 0; // Return 0 in case of error
                    })
            );
        }
        
        // Step 3: Wait for all promises to resolve and sum up the results
        const results = await Promise.all(promises);
        const totalDraws = results.reduce((acc, val) => acc + val, 0);
        
        return totalDraws;
    } catch (error) {
        console.error(`Error fetching data for year ${year}: ${error.message}`);
        return 0; // Return 0 in case of error
    }
}

// Read input from standard input (stdin)
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
process.stdin.on('data', input => {
    inputString += input;
});

process.stdin.on('end', () => {
    const year = parseInt(inputString.trim());
    
    // Validate input
    if (isNaN(year)) {
        console.error("Invalid input. Please enter a valid year.");
        return;
    }
    
    // Call getNumDraws with the provided year
    getNumDraws(year)
        .then(numDraws => {
            console.log(numDraws); // Output the number of draws for the given year
        })
        .catch(err => {
            console.error(err); // Log any errors that occur during execution
        });
});
