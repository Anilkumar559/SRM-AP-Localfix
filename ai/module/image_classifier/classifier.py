from PIL import Image
import torch
from transformers import pipeline


class ImageClassifier:

    def __init__(self):
        self.classifier = pipeline(
            "image-classification",
            model="google/mobilenet_v2_1.0_224"
        )

    def classify(self, image_path):

        image = Image.open(image_path).convert("RGB")

        results = self.classifier(image)

        top_result = results[0]

        return {
            "label": top_result["label"],
            "confidence": round(float(top_result["score"]), 4)
        }


image_classifier = ImageClassifier()