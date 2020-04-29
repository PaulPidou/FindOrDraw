import * as tf from "@tensorflow/tfjs";
import {bundleResourceIO} from "@tensorflow/tfjs-react-native";
import * as mobilenet from "@tensorflow-models/mobilenet";

const modelJson = require('../assets/model/model.json');
const modelWeights = require('../assets/model/group1-shard1of1.bin');

import QUICKDRAW_CLASSES from "../assets/model/quickdraw_classes";

let drawModel = null
let findModel = null

export async function loadDrawModel(){
    drawModel = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
}

export async function predictFromDraw(sortedRGBPixels, width, height){
    const image = tf.tensor(sortedRGBPixels).reshape([width, height, 3])

    const scaledImage = tf.tidy(() => {
        const grayScaleImg = tf.max(image, 2).expandDims(2)
        const resizedImage = tf.image.resizeBilinear(grayScaleImg, [64, 64])
        const batchedImage = resizedImage.expandDims(0)
        return batchedImage.toFloat().div(tf.scalar(127.5)).sub(tf.scalar(1))
    });

    if (drawModel) {
        const prediction = await drawModel.predict(scaledImage)
        const predictedTensor = prediction.as1D().argMax()
        const predictedValue = (await predictedTensor.data())[0]
        return QUICKDRAW_CLASSES[predictedValue]
    }
    return null
}

export async function loadMobilenetModel() {
    findModel = await mobilenet.load()
}

export async function predictFromCamera(imageTensor) {
    return await findModel.classify(imageTensor);
}