# ImageTextExtractor

ImageTextExtractor is a web application that allows users to upload images, crop them if necessary, and extract text from the images using Optical Character Recognition (OCR) technology. The application leverages Tesseract.js for OCR and OpenCV.js for image preprocessing to enhance text extraction accuracy.

## Features

- Upload images by dragging and dropping, selecting from the file system, or pasting from the clipboard.
- Crop images to focus on specific areas for text extraction.
- Preprocess images to improve text extraction accuracy.
- Extract text from images using Tesseract.js.
- Display extracted text in a text area for easy copying and editing.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/ImageTextExtractor.git
    cd ImageTextExtractor
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Dependencies

- React: A JavaScript library for building user interfaces.
- Tesseract.js: A JavaScript library for OCR.
- OpenCV.js: A JavaScript library for image processing.
- React Easy Crop: A React component to crop images.

## Usage

1. Upload an image by dragging and dropping it into the designated area, selecting it from the file system, or pasting it from the clipboard.
2. If the image is large, click the edit button (✏️) above the uploaded image to crop it.
3. Adjust the crop area by dragging the corners of the crop box.
4. Click the "Crop" button to apply the crop.
5. Click the "Extract Text" button to extract text from the cropped image.
6. The extracted text will be displayed in a text area below the image.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](http://_vscodecontentref_/2) file for details.

## Acknowledgements

- [Tesseract.js](https://github.com/naptha/tesseract.js)
- [OpenCV.js](https://docs.opencv.org/4.x/d5/d10/tutorial_js_root.html)
- [React Easy Crop](https://github.com/ValentinH/react-easy-crop)

