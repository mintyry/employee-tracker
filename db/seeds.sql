INSERT INTO departments (name) 
VALUES ('Legal'), ('Marketing'), ('Production'), ('Talent');

INSERT INTO roles (title, salary, department_id) 
VALUES  ('Lawyer', 200000, 1),
        ('Copywriter', 80000, 2),
        ('CSR', 65000, 2),
        ('Promoter', 1000000, 3),
        ('Camera', 70000, 3),
        ('Referees', 55000, 4),
        ('Wrestler', 100000, 4),
        ('Valet', 60000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES  ('Roman', 'Reigns', 7, 3),
        ('Jim', 'Ross', 3, 3),
        ('Vince', 'McMahon', 4, null),
        ('Mark', 'Sterling', 1, null),
        ('Matt', 'Cardona', 5, 3),
        ('Earl', 'Hebner', 6, 3),
        ('Paul', 'Heyman', 8, 7),
        ('Renee', 'Paquette', 2, 3);