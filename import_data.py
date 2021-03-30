import pandas as pd
import json
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

df=pd.read_json("(11-01, 11-30)bq-results-20210325-001051-lv1pjiq09xrw.json", lines=True)
print(df.head())
# visit_df=df[[]].copy()