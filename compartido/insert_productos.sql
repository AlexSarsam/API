
INSERT INTO categorias_productos (nombre, descripcion) VALUES
('Proteinas', 'Proteínas en polvo y suplementos proteicos'),
('Vitaminas', 'Vitaminas y minerales esenciales'),
('Barritas', 'Barritas proteicas y energéticas');


INSERT INTO productos (nombre_producto, descripcion, precio, stock, id_categoria, imagen_url, estado) VALUES
('Vitamina Omega-3', 'Suplemento de ácidos grasos Omega-3 ESN Total Kinetic Sport', 30.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Vitaminas'), NULL, 'disponible'),
('Vitamina Zinc', 'Suplemento de Zinc ESN TKS para el sistema inmunológico', 31.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Vitaminas'), NULL, 'disponible'),
('Melatonina', 'Melatonina ESN Total Kinetic Sport para mejorar el descanso', 22.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Vitaminas'), NULL, 'disponible'),
('Vitamina Kidney', 'Suplemento vitamínico para la salud renal', 20.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Vitaminas'), NULL, 'disponible'),
('Vitamina Magnesium', 'Suplemento de Magnesio para músculos y sistema nervioso', 22.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Vitaminas'), NULL, 'disponible'),
('Protein Probiotic+', 'Suplemento probiótico con proteína para la salud digestiva', 18.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Vitaminas'), NULL, 'disponible');


INSERT INTO productos (nombre_producto, descripcion, precio, stock, id_categoria, imagen_url, estado) VALUES
('Protein Whey Coffee Bar', 'Barrita proteica sabor café con whey protein', 30.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Barritas'), NULL, 'disponible'),
('Protein Cacahuetes Bar', 'Barrita proteica sabor cacahuetes', 31.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Barritas'), NULL, 'disponible'),
('Protein Avellanas Bar', 'Barrita proteica sabor avellanas', 22.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Barritas'), NULL, 'disponible'),
('Protein Stracciatella Bar', 'Barrita proteica sabor stracciatella', 20.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Barritas'), NULL, 'disponible'),
('Protein Coconut Bar', 'Barrita proteica sabor coco', 22.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Barritas'), NULL, 'disponible'),
('Protein Pistacho Bar', 'Barrita proteica sabor pistacho', 18.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Barritas'), NULL, 'disponible');


INSERT INTO productos (nombre_producto, descripcion, precio, stock, id_categoria, imagen_url, estado) VALUES
('Protein Whey Coffee', 'Proteína en polvo sabor café con whey protein premium', 43.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Proteinas'), NULL, 'disponible'),
('Protein Cacahuetes', 'Proteína en polvo sabor cacahuetes premium', 49.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Proteinas'), NULL, 'disponible'),
('Protein Avellanas', 'Proteína en polvo sabor avellanas premium', 38.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Proteinas'), NULL, 'disponible'),
('Protein Stracciatella', 'Proteína en polvo sabor stracciatella premium', 42.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Proteinas'), NULL, 'disponible'),
('Protein Coconut', 'Proteína en polvo sabor coco premium', 35.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Proteinas'), NULL, 'disponible'),
('Protein Pistacho', 'Proteína en polvo sabor pistacho premium', 49.99, 50, (SELECT id_categoria FROM categorias_productos WHERE nombre='Proteinas'), NULL, 'disponible');
