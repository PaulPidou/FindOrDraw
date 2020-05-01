import * as tf from "@tensorflow/tfjs";

export function transposeAndApplyAlpha(bottomFirstLTRPixels, width, height){
    /*
    const rTensor = tf.tensor(pixels).reshape([length, length, 4])
        const TLPimage = tf.reverse(rTensor, 0) // Flip horizontally
        const imageWA = tf.mul(TLPimage, tf.tensor([[[1, 1, 1, 0]]])) // Remove alpha
        //const image = tf.sub(tf.tensor([[[255, 255, 255, 0]]]), imageWA) // Inverse color
        const grayScaleImg = tf.max(imageWA, 2).expandDims(2)
        const gImage = grayScaleImg.flatten().arraySync()
     */

        // Rotate the Image, the screen need data in a bottom to top order column by columns
        // We will also remove the alpha layer by applying the color over a black backend
        const RGBBackground = [0, 0, 0]
        const rotatedRGBdata = []
        for (let y = height-1; y >= 0; y--) {
            for (let x = 0; x < width ; ++x) {
                const firstByteOfPixel = (y * width + x) * 4
                const alpha = bottomFirstLTRPixels[firstByteOfPixel + 3] / 255
                // R
                rotatedRGBdata.push((1 - alpha) * RGBBackground[0] + alpha * (255-bottomFirstLTRPixels[firstByteOfPixel]))
                // G
                //rotatedRGBdata.push((1 - alpha) * RGBBackground[1] + alpha * (255-bottomFirstLTRPixels[firstByteOfPixel + 1]))
                // B
                //rotatedRGBdata.push((1 - alpha) * RGBBackground[2] + alpha * (255-bottomFirstLTRPixels[firstByteOfPixel + 2]))
            }
        }
        return rotatedRGBdata
}