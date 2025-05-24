-- Create the database schema
CREATE DATABASE IF NOT EXISTS pole_management;
USE pole_management;

-- Create poles table
CREATE TABLE poles (
    id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    title VARCHAR(100) NOT NULL,
    director_id VARCHAR(36) NOT NULL,
    commune VARCHAR(50) NOT NULL,
    wilaya VARCHAR(50) NOT NULL,
    last_submission DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create directors table
CREATE TABLE directors (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create nts table (Normes Techniques)
CREATE TABLE nts (
    id VARCHAR(36) PRIMARY KEY,
    pole_id VARCHAR(36) NOT NULL,
    code VARCHAR(20) NOT NULL,
    title VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pole_id) REFERENCES poles(id)
);

-- Insert mock poles data
INSERT INTO poles (id, code, title, director_id, commune, wilaya, last_submission) VALUES
('1', 'P001', 'Bâtiment et Travaux Publics', '1', 'Alger Centre', 'Alger', NOW() - INTERVAL 2 DAY),
('2', 'P002', 'Ouvrages d''Art', '2', 'Oran', 'Oran', NOW() - INTERVAL 1 MONTH),
('3', 'P003', 'Travaux Ferroviaires', '3', 'Constantine', 'Constantine', NOW() - INTERVAL 15 DAY),
('4', 'P004', 'Infrastructures Maritimes', '1', 'Annaba', 'Annaba', NULL),
('5', 'P005', 'Hydraulique et Barrages', '2', 'Tlemcen', 'Tlemcen', NOW() - INTERVAL 7 DAY);

-- Insert mock directors data
INSERT INTO directors (id, name, email, phone) VALUES
('1', 'Ahmed Benali', 'ahmed.benali@cosider.dz', '+213 555 123 456'),
('2', 'Karim Mansouri', 'karim.mansouri@cosider.dz', '+213 555 789 012'),
('3', 'Fatima Zahra', 'fatima.zahra@cosider.dz', '+213 555 345 678');

-- Insert mock NTs data
INSERT INTO nts (id, pole_id, code, title) VALUES
('1', '1', 'NT-2025-001', 'Implémentation des normes de sécurité'),
('2', '1', 'NT-2025-002', 'Procédures d''urgence sur chantier'),
('3', '2', 'NT-2025-003', 'Inspection structurelle des ponts'),
('4', '3', 'NT-2025-004', 'Maintenance des voies ferrées'),
('5', '5', 'NT-2025-005', 'Gestion des ressources hydrauliques');