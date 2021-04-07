-- Table: public.Nov_devices

-- DROP TABLE public.Nov_devices;

CREATE TABLE public.Nov_devices
(
    Device_Name character varying(10) COLLATE pg_catalog."default",
    Device_Count integer,
    Device_Percentage real
)

TABLESPACE pg_default;

ALTER TABLE public.Nov_devices
    OWNER to postgres;

----------------------------------------------------------------

-- Table: public.BlackFriday_devices

-- DROP TABLE public.BlackFriday_devices;

CREATE TABLE public.BlackFriday_devices
(
    Device_Name character varying(10) COLLATE pg_catalog."default",
    Device_Count integer,
    Device_Percentage real
)

TABLESPACE pg_default;

ALTER TABLE public.BlackFriday_devices
    OWNER to postgres;