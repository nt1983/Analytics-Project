-- Table: public.products

DROP TABLE IF EXISTS public.products;

CREATE TABLE public.products
(
    product_id character varying(40) COLLATE pg_catalog."default" NOT NULL,
    product_category_name character varying(50) COLLATE pg_catalog."default",
    product_name_lenght integer,
    product_description_lenght integer,
    product_photos_qty integer,
    product_weight_g integer,
    product_length_cm integer,
    product_height_cm integer,
    product_width_cm integer,
	CREATE_DATE date,
    CREATED_BY character varying(60) COLLATE pg_catalog."default",
    CHANGED_DATE date,
    CHANGED_BY character varying(60) COLLATE pg_catalog."default",
    CONSTRAINT products_pkey PRIMARY KEY (product_id)
)

TABLESPACE pg_default;

ALTER TABLE public.products
    OWNER to postgres;
	
CREATE TRIGGER update_row_modified_function_
    BEFORE INSERT OR UPDATE 
    ON public.products
    FOR EACH ROW
    EXECUTE PROCEDURE public.update_row_modified_function_();	