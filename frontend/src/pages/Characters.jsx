    import React, { useEffect, useState } from "react";
    import CharacterCard from "../components/CharacterCard";
    import { useParams } from "react-router-dom";

    const Character = ({ title }) => {
    const [htmlContent, setHtmlContent] = useState('');
    const [characterImage, setCharacterImage] = useState(''); // State to store the main character image URL
    const [characterStats, setCharacterStats] = useState({}); // State to store extracted statistics/attributes
    const [initialMessagesHtml, setInitialMessagesHtml] = useState(''); // State to store the initial warning messages
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { character } = useParams();


    // Helper function to process raw HTML from Fandom
    const processFandomHtml = (rawHtml) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(rawHtml, 'text/html');

        // 1. Extract and remove the first two table elements (the warning/info messages)
        const initialTables = doc.querySelectorAll('.mw-parser-output > table');
        let tempInitialMessages = '';
        if (initialTables.length >= 2) {
        tempInitialMessages += initialTables[0].outerHTML;
        tempInitialMessages += initialTables[1].outerHTML;
        initialTables[0].remove();
        initialTables[1].remove();
        }
        setInitialMessagesHtml(tempInitialMessages);

        // 2. Remove edit section links (e.g., [edit] next to headings)
        doc.querySelectorAll('.mw-editsection').forEach(span => span.remove());

        // 3. Extract and remove infobox (for stats and main image)
        const infobox = doc.querySelector('.portable-infobox');
        let extractedStats = {};
        let extractedImage = '';

        if (infobox) {
        // Extract main image (prioritize PNG if tabber is present, otherwise first image)
        const pngImage = infobox.querySelector('.pi-image-collection .wds-is-current img');
        if (pngImage) {
            extractedImage = pngImage.src || pngImage.dataset.src; // Use src or data-src for lazyload
        } else {
            // Fallback for any other image in the infobox if no tabber or tabber doesn't work
            const fallbackImage = infobox.querySelector('.pi-image-thumbnail');
            if (fallbackImage) {
            extractedImage = fallbackImage.src || fallbackImage.dataset.src;
            }
        }

        // Extract statistics/attributes
        infobox.querySelectorAll('.pi-item.pi-data').forEach(dataItem => {
            const labelEl = dataItem.querySelector('.pi-data-label');
            const valueEl = dataItem.querySelector('.pi-data-value');
            if (labelEl && valueEl) {
            const label = labelEl.textContent.trim();
            const value = valueEl.textContent.trim();
            extractedStats[label.toLowerCase().replace(/\s+/g, '_')] = value; // Convert label to friendly key
            }
        });

        // Remove the entire infobox from the document
        infobox.remove();
        }

        // Remove wds-tabber elements if they still exist (sometimes they can be outside infobox or after infobox removal)
        doc.querySelectorAll('.wds-tabber').forEach(tabber => tabber.remove());
        
        // 4. Update internal wiki links from /wiki/{Name} to /characters/{Name}
        doc.querySelectorAll('a[href]').forEach(aTag => {
        const href = aTag.getAttribute('href');
        // Check if it's an internal wiki link (starts with /wiki/ and doesn't contain a colon for external links)
        if (href && href.startsWith('/wiki/') && !href.includes(':')) {
            const characterName = href.substring('/wiki/'.length);
            aTag.setAttribute('href', `/characters/${characterName}`);
        }
        });

        // Update state with extracted data
        setCharacterImage(extractedImage);
        setCharacterStats(extractedStats);

        // Return the cleaned HTML string
        return doc.body.innerHTML;
    };

    useEffect(() => {
        const fetchWikiData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
            `https://senkosan.fandom.com/api.php?action=parse&page=${encodeURIComponent(
                character
            )}&prop=text&format=json&origin=*`
            );
            const data = await res.json();

            if (data.error) {
            setError(`Error from Fandom API: ${data.error.info}`);
            setLoading(false);
            return;
            }

            if (data.parse && data.parse.text && typeof data.parse.text['*'] === 'string') {
            const processedHtml = processFandomHtml(data.parse.text['*']);
            setHtmlContent(processedHtml);
            } else {
            console.error("Parsed HTML content not found or invalid format.", data);
            setError("Could not find page content or invalid format.");
            }
            
            setLoading(false);

        } catch (error) {
            console.error("Error fetching wiki data:", error);
            setError("Connection error or failed to load data.");
        } finally {
            setLoading(false);
        }
        };

        fetchWikiData();
    }, [title]);

    return (
        <div className="p-6 max-w-3xl mx-auto font-sans text-gray-800">
        {/* Add custom styles for the embedded HTML content */}
        <style jsx>{`
            .fandom-content-wrapper img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem; /* Rounded corners for images */
            margin-top: 1rem;
            margin-bottom: 1rem;
            display: block; /* Ensure images behave as blocks */
            }
            .fandom-content-wrapper table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
            margin-bottom: 1rem;
            border-radius: 0.5rem; /* Rounded corners for tables */
            overflow: hidden; /* Ensures rounded corners apply to content */
            }
            .fandom-content-wrapper th, .fandom-content-wrapper td {
            border: 1px solid #e2e8f0; /* Tailwind's gray-200 */
            padding: 0.75rem;
            text-align: left;
            }
            .fandom-content-wrapper th {
            background-color: #f8fafc; /* Tailwind's gray-50 */
            font-weight: 600;
            }
            .fandom-content-wrapper a {
            color: #6d28d9; /* Tailwind's purple-700 */
            text-decoration: underline;
            }
            .fandom-content-wrapper a:hover {
            color: #8b5cf6; /* Tailwind's purple-500 */
            }
            .fandom-content-wrapper h2, .fandom-content-wrapper h3, .fandom-content-wrapper h4 {
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            font-weight: 700;
            color: #1a202c; /* Tailwind's gray-900 */
            }
            .fandom-content-wrapper p {
            margin-bottom: 1rem;
            line-height: 1.6;
            }
            .fandom-content-wrapper ul, .fandom-content-wrapper ol {
            margin-left: 1.5rem;
            margin-bottom: 1rem;
            list-style-position: outside;
            }
            .fandom-content-wrapper ul li {
            list-style-type: disc;
            }
            .fandom-content-wrapper ol li {
            list-style-type: decimal;
            }
            /* Styling for Fandom's specific elements like infoboxes */
            .fandom-content-wrapper .portable-infobox {
                background-color: #f0f0f0; /* Light gray background */
                border: 1px solid #d1d5db; /* Gray border */
                border-radius: 0.75rem; /* More rounded corners */
                padding: 1rem;
                margin-bottom: 1.5rem;
                float: right; /* Often infoboxes float right */
                margin-left: 1rem;
                max-width: 300px; /* Limit width */
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .fandom-content-wrapper .portable-infobox h2,
            .fandom-content-wrapper .portable-infobox h3 {
                font-size: 1.25rem;
                margin-top: 0;
                margin-bottom: 0.5rem;
                color: #374151; /* Darker gray for headings */
            }
            .fandom-content-wrapper .portable-infobox .pi-image-collection img {
                border-radius: 0.5rem;
                margin-bottom: 0.5rem;
            }
            .fandom-content-wrapper .portable-infobox table {
                border: none;
                width: 100%;
            }
            .fandom-content-wrapper .portable-infobox th,
            .fandom-content-wrapper .portable-infobox td {
                border: none;
                padding: 0.5rem 0;
            }
            .fandom-content-wrapper .mw-parser-output {
                /* Basic styling to contain the content */
                line-height: 1.6;
                color: #333;
            }
            .fandom-content-wrapper .mw-parser-output .toc {
                border: 1px solid #e2e8f0;
                background-color: #f8fafc;
                padding: 1rem;
                border-radius: 0.5rem;
                margin-bottom: 1.5rem;
            }
            .fandom-content-wrapper .mw-parser-output .toc ul {
                list-style: none;
                padding-left: 0;
            }
            .fandom-content-wrapper .mw-parser-output .toc li a {
                text-decoration: none;
                color: #374151;
            }
            .fandom-content-wrapper .mw-parser-output .toc li a:hover {
                color: #6d28d9;
            }
        `}</style>

        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        {loading ? (
            <p>Loading data...</p>
        ) : error ? (
            <p className="text-red-600 font-semibold">Error: {error}</p>
        ) : (
            <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none fandom-content-wrapper">
            {/* Display initial warning/info messages */}
            {initialMessagesHtml && (
                <div dangerouslySetInnerHTML={{ __html: initialMessagesHtml }} />
            )}

            {characterImage && (
                <div className="flex justify-center my-4">
                <img src={characterImage} alt={title} className="rounded-lg shadow-md" style={{maxWidth: '250px'}} />
                </div>
            )}

            {Object.keys(characterStats).length > 0 && (
                <div className="my-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-3 text-gray-900">Character Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {Object.entries(characterStats).map(([key, value]) => (
                    <p key={key} className="text-sm">
                        <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span> {value}
                    </p>
                    ))}
                </div>
                </div>
            )}

            {/* Use dangerouslySetInnerHTML to display the remaining HTML */}
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />

            </div>
        )}
        </div>
    );
    };

    export default Character;
