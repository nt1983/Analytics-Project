def create_classes(db):
    class Website_Analytics(db.Model):
        __tablename__ = 'Nov_devices'

        Device_Name = db.Column(db.String(10), primary_key=True)
        Device_Count = db.Column(db.integer)
        Device_Percentage = db.Column(db.Float)
        
        def __repr__(self):
            return '<Website_Analytics %r>' % (self.name)
    return Website_Analytics
