-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    average_rating FLOAT DEFAULT 0
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id),
    score INTEGER CHECK (score >= 1 AND score <= 5)
);

-- Insert sample recipes
INSERT INTO recipes (title, description, image_url) VALUES
('Spaghetti Carbonara', 'A classic Italian pasta dish with eggs, cheese, and pancetta.', 'https://example.com/carbonara.jpg'),
('Chicken Tikka Masala', 'Grilled chicken chunks in a creamy spiced tomato sauce.', 'https://example.com/tikka-masala.jpg'),
('Vegetarian Buddha Bowl', 'A nourishing bowl filled with quinoa, roasted vegetables, and tahini dressing.', 'https://example.com/buddha-bowl.jpg'),
('Classic Beef Burger', 'Juicy beef patty with lettuce, tomato, and cheese in a soft bun.', 'https://example.com/burger.jpg'),
('Chocolate Lava Cake', 'Decadent chocolate cake with a gooey molten center.', 'https://example.com/lava-cake.jpg');

-- Insert sample ratings
INSERT INTO ratings (recipe_id, score) VALUES
(1, 5), (1, 4), (1, 5),
(2, 4), (2, 5), (2, 4),
(3, 3), (3, 4), (3, 5),
(4, 5), (4, 5), (4, 4),
(5, 5), (5, 5), (5, 5);

-- Update average ratings
UPDATE recipes
SET average_rating = (
    SELECT AVG(score)::FLOAT
    FROM ratings
    WHERE ratings.recipe_id = recipes.id
);
