INSERT INTO departments (name) 
VALUES ('Legal'), ('Marketing'), ('Production'), ('Talent');

INSERT INTO roles (title, salary, department_id) 
VALUES  ('Lawyer', 200000, 1),
        ('Copywriter', 80000, 2),
        ('CSR', 65000, 2),
        ('Producer', 180000, 3),
        ('Camera-person', 70000, 3),
        ('Referees', 55000, 4),
        ('Wrestler', 100000, 4),
        ('Valet', 60000, 4);