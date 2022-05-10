from timm.models import create_model  
from .MetaFG import *
from .MetaFG_meta import *
def build_model():
    model = create_model(
            "MetaFG_2",
            pretrained=True,
            num_classes=2
    )

    return model