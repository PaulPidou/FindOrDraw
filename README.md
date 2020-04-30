# FindOrDraw

This repository contains the code of the **FindOrDraw** game app.

This game app is built with [React Native](https://reactnative.dev/) and [Redux](https://redux.js.org/) and
it relies on [TensorFlow.js](https://www.tensorflow.org/js) as well as [tfjs-react-native](https://github.com/tensorflow/tfjs/tree/master/tfjs-react-native) for running in-app deep learning models.

## Deep learning models
Both models used by the app are Convolutional Neural Networks based on [MobileNet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet).

### Find
In the *FindScreen*, the app is directly using the MobileNet model which has been trained on the ImageNet database. 

### Draw
In the *DrawScreen*, the app is using the gray-scale MobileNet model trained by *beluga* on the [Quick, Draw dataset](https://quickdraw.withgoogle.com/data).
More information on the model training are available on Kaggle: [Greyscale MobileNet [LB=0.892]](https://www.kaggle.com/gaborfodor/greyscale-mobilenet-lb-0-892).

Only the model weights were available within the Kaggle kernel. 
As it is needed to save the full Keras model in order to be able to convert it for tfjs, the following Python code has been used:
```
from tensorflow.keras.applications import MobileNet

NCATS = 340
size = 64
model = MobileNet(input_shape=(size, size, 1), alpha=1., weights='quickdraw_model.h5', classes=NCATS)

saved_model_path = "./quickdraw_model.h5"
model.save(saved_model_path)
```

Once saved, the Keras model was converted thanks to the following command:
```
!tensorflowjs_converter --input_format=keras --weight_shard_size_bytes 20000000 {saved_model_path} ./
```
More information on this converter can be found on the [tfjs GitHub repository](https://github.com/tensorflow/tfjs/tree/master/tfjs-converter#conversion-flags).

