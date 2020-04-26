import * as tf from "@tensorflow/tfjs";
import QUICKDRAW_CLASSES from "../assets/model/quickdraw_classes";
import {bundleResourceIO} from "@tensorflow/tfjs-react-native";

const modelJson = require('../assets/model/model.json');
const modelWeights = require('../assets/model/group1-shard1of1.bin');

let model = null

export async function loadModel(){
    model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
}

export async function predictFromDraw(sortedRGBPixels, width, height){
    const image = tf.tensor(sortedRGBPixels).reshape([width, height, 3])

    const scaledImage = tf.tidy(() => {
        const grayScaleImg = tf.max(image, 2).expandDims(2)
        const resizedImage = tf.image.resizeBilinear(grayScaleImg, [64, 64])
        const batchedImage = resizedImage.expandDims(0)
        return batchedImage.toFloat().div(tf.scalar(127.5)).sub(tf.scalar(1))
    });

    if (model) {
        const prediction = await model.predict(scaledImage)
        const predictedTensor = prediction.as1D().argMax()
        const predictedValue = (await predictedTensor.data())[0]
        return QUICKDRAW_CLASSES[predictedValue]
    }
    return null
}