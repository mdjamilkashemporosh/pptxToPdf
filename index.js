const { exec } = require('child_process');
const path = require('path');

/**
 * Converts a PowerPoint file to PDF using LibreOffice.
 * @param {string} inputFilePath - The path to the input .pptx file.
 * @param {string} outputDir - The directory where the output .pdf will be saved.
 * @returns {Promise<string>} - Resolves with the path to the converted PDF file.
 */
function convertPptToPdf(inputFilePath, outputDir) {
    return new Promise((resolve, reject) => {
        // Generate the output file path with a .pdf extension
        const outputFilePath = path.join(
            outputDir,
            `${path.basename(inputFilePath, path.extname(inputFilePath))}.pdf`
        );
        
        // LibreOffice command for conversion
        const command = `libreoffice --headless --convert-to pdf "${inputFilePath}" --outdir "${outputDir}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Conversion failed: ${stderr}`);
            } else {
                resolve(outputFilePath);
            }
        });
    });
}

// Example usage
const inputFilePath = './sample.pptx'; // Ensure this path matches your volume mapping
const outputDir = './'; // Ensure this path matches your volume mapping

convertPptToPdf(inputFilePath, outputDir)
    .then((outputFilePath) => {
        console.log(`File converted successfully: ${outputFilePath}`);
    })
    .catch((error) => {
        console.error(error);
    });
