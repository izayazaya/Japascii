document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const about = document.getElementById("about");
  const contact = document.getElementById("contact");
  const textToAscii = document.getElementById("textToAscii");
  const imageToAscii = document.getElementById("imageToAscii");

  function showAbout(event) {
    event.preventDefault();
    textToAscii.innerHTML = "";
    const aboutContainer = document.createElement("div");
    aboutContainer.id = "aboutContainer";
    aboutContainer.innerHTML = `
            <p id="aboutTitle">ABOUT</p>
            <p id="aboutContents">lorem ipsum</p>
        `;
    textToAscii.appendChild(aboutContainer);
    about.classList.add("disableBtn");

    const backBtn = document.createElement("button");
    backBtn.textContent = "Go back";
    backBtn.id = "backBtn";
    aboutContainer.appendChild(backBtn);

    backBtn.addEventListener("click", initializeApps);
  }

  function showContact(event) {
    event.preventDefault();
    imageToAscii.innerHTML = "";
    const contactContainer = document.createElement("div");
    contactContainer.id = "contactContainer";
    contactContainer.innerHTML = `
            <p id="contactTitle">CONTACT</p>
            <p id="contactContents">lorem ipsum</p>
        `;
    imageToAscii.appendChild(contactContainer);
    contact.classList.add("disableBtn");

    const backBtn = document.createElement("button");
    backBtn.textContent = "Go back";
    backBtn.id = "backBtn";
    contactContainer.appendChild(backBtn);

    backBtn.addEventListener("click", initializeApps);
  }

  function initializeApps() {
    about.classList.remove("disableBtn");
    contact.classList.remove("disableBtn");
    textToAscii.innerHTML = "";
    imageToAscii.innerText = "";

    textToAscii.innerHTML = `
            <h2 class="toolTitle">Text to ASCII Art Generator</h2>
            <div id="inputContainer">
                <form>
                    <h3>Input text</h3>
                    <textarea type="text" id="liveInput" rows="5" cols="30" placeholder="Type your message here..."></textarea>
                    </form>
                </div>
            <div id="outputContainer">
                <h3>Output</h3>
                <div id="outputTextContainer">
                    <p id="outputText">Output will appear here...</p>
                </div>
            </div>

            <button onClick="copyOutput()">Copy to Clipboard</button>
            <button onClick="downloadOutputPNG()">Download PNG</button>
            <button onClick="shareOutput()">Generate Share Link</button>
        `;
    imageToAscii.innerHTML = `
            <h2 class="toolTitle">Image to ASCII Art Generator</h2>
        `;

    const inputElement = document.getElementById("liveInput");
    const outputElement = document.getElementById("outputText");

    if (inputElement && outputElement) {
      inputElement.addEventListener("input", (event) => {
        outputElement.textContent = event.target.value;
      });
    } else {
      console.error("Failed to find liveInput or outputText elements.");
    }
  }

  initializeApps();

  about.addEventListener("click", showAbout);
  contact.addEventListener("click", showContact);
});

async function downloadOutputPNG() {
  console.log("hello");
  const canvasElement = document.querySelector("#outputTextContainer");

  const canvas = await html2canvas(canvasElement, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  // Create a temporary link to trigger the download
  const link = document.createElement("a");
  link.href = imgData;
  link.download = "Japascii.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function copyOutput() {
  var copyText = document.getElementById("outputText").innerText;

  // Create a temporary textarea to copy text
  var tempInput = document.createElement("textarea");
  tempInput.value = copyText;
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile

  // Copy the text
  document.execCommand("copy"); // Works even if navigator.clipboard isn't available
  document.body.removeChild(tempInput);

  alert("Copied the text: " + copyText);
}

// Function to generate shareable link and copy to clipboard
function shareOutput() {
  const input = document.getElementById("liveInput"); // get the textarea
  if (!input) return alert("Input element not found!");

  const text = encodeURIComponent(input.value); // encode for URL safety
  const shareURL = `${window.location.origin}${window.location.pathname}?text=${text}`;

  // Copy link to clipboard
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(shareURL)
      .then(() => alert("Share link copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  } else {
    // Fallback for insecure context or older browsers
    const temp = document.createElement("textarea");
    temp.value = shareURL;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    alert("Share link copied to clipboard!");
  }
}

// Optional: prefill input from URL on page load
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const input = document.getElementById("liveInput");
  if (input && params.has("text")) {
    input.value = params.get("text");
  }
});
