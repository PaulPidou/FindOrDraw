export function transposeAndApplyAlpha(bottomFirstLTRPixels, width, height){
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
            rotatedRGBdata.push((1 - alpha) * RGBBackground[1] + alpha * (255-bottomFirstLTRPixels[firstByteOfPixel + 1]))
            // B
            rotatedRGBdata.push((1 - alpha) * RGBBackground[2] + alpha * (255-bottomFirstLTRPixels[firstByteOfPixel + 2]))
        }
    }
    return rotatedRGBdata
}