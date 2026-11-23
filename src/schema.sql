CREATE TABLE IF NOT EXISTS app_user (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(200) NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male','female')),
    phone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS owner (
    owner_id UUID PRIMARY KEY REFERENCES app_user (user_id),
    owner_address VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS university (
    university_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS college (
    college_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID NOT NULL REFERENCES university (university_id),
    name          VARCHAR(150) NOT NULL,
    UNIQUE (university_id, name)
);

CREATE TABLE IF NOT EXISTS student (
    student_id UUID PRIMARY KEY REFERENCES app_user (user_id),
    college_id UUID REFERENCES college (college_id) NOT NULL,
    original_government VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS housing (
    housing_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES owner (owner_id) NOT NULL,
    title VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    gender_type VARCHAR(10) NOT NULL CHECK (gender_type IN ('male','female','any')),
    total_beds INT NOT NULL CHECK (total_beds > 0),
    latitude DOUBLE PRECISION NOT NULL, 
    longitude DOUBLE PRECISION NOT NULL
);

CREATE TABLE IF NOT EXISTS lease (
    lease_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES student (student_id) NOT NULL,
    housing_id UUID REFERENCES housing (housing_id) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    monthly_rent DECIMAL(10,2) NOT NULL CHECK (monthly_rent > 0),
    status VARCHAR(20) NOT NULL CHECK (status IN ('started','stopped','cancelled','ended')),
    CHECK (end_date > start_date)
);