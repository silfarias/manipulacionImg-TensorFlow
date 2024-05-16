document.getElementById('imageUpload').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const imgElement = document.getElementById('originalImage');
        imgElement.src = event.target.result;

        imgElement.onload = function() {
            const tensor = tf.browser.fromPixels(imgElement);

            // Resize using bilinear interpolation
            const resizedBilinear = tf.image.resizeBilinear(tensor, [100, 100]);
            tf.browser.toPixels(resizedBilinear, document.getElementById('resizedImageBilinear'));

            // Resize using nearest neighbor interpolation
            const resizedNearestNeighbor = tf.image.resizeNearestNeighbor(tensor, [100, 100]);
            tf.browser.toPixels(resizedNearestNeighbor, document.getElementById('resizedImageNearestNeighbor'));

            // Mirror the image
            const mirrored = tensor.reverse(1);
            tf.browser.toPixels(mirrored, document.getElementById('mirroredImage'));

            // Clean up tensors to free memory
            tensor.dispose();
            resizedBilinear.dispose();
            resizedNearestNeighbor.dispose();
            mirrored.dispose();
        };
    };
    reader.readAsDataURL(e.target.files[0]);
});





















// document.getElementById('imageUpload').addEventListener('change', function(e) {
//     const reader = new FileReader();
//     reader.onload = function(event) {
//         const imgElement = document.getElementById('originalImage');
//         imgElement.src = event.target.result;

//         imgElement.onload = function() {
//             const tensor = tf.browser.fromPixels(imgElement);

//             // Resize using bilinear interpolation
//             const resizedBilinear = tf.image.resizeBilinear(tensor, [100, 100]);
//             tf.browser.toPixels(resizedBilinear, document.getElementById('resizedImageBilinear'));

//             // Resize using nearest neighbor interpolation
//             const resizedNearestNeighbor = tf.image.resizeNearestNeighbor(tensor, [100, 100]);
//             tf.browser.toPixels(resizedNearestNeighbor, document.getElementById('resizedImageNearestNeighbor'));

//             // Mirror the image
//             const mirrored = tensor.reverse(1);
//             tf.browser.toPixels(mirrored, document.getElementById('mirroredImage'));

//             // Clean up tensors to free memory
//             tensor.dispose();
//             resizedBilinear.dispose();
//             resizedNearestNeighbor.dispose();
//             mirrored.dispose();
//         };
//     };
//     reader.readAsDataURL(e.target.files[0]);
// });