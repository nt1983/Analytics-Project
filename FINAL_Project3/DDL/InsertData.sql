-- 1. Insert data into Nov_devices ---------------------------------

COPY Nov_devices (
	Device_Name,
	Device_Count,
    Device_Percentage
    )
/*Update your location of the files here*/	
FROM 'C:\Git\Analytics-Project\data/Nov_devices.csv' DELIMITER ',' CSV HEADER;

-- 2. Insert data into BlackFriday_devices ---------------------------------

COPY BlackFriday_devices (
	Device_Name,
	Device_Count,
    Device_Percentage
    )
/*Update your location of the files here*/	
FROM 'C:\Git\Analytics-Project\data/BlackFriday_devices.csv' DELIMITER ',' CSV HEADER;