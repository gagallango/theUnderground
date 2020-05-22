# The Underground

The Underground is a writting and content creator platform dedicated to all the frustrated writters out there. 

It's very simple, you just have to write whatever you want, choising the genre and typology of your text and a perfect cover to make it look cute for those who want to read it. 

We know you're a good writter, show us your magic!

## Main Backend Routes

ID | Path | Description |
--- | --- | --- |
1 | /api/user | Rutas de user |
2 | /api/post | Rutas de posts |

## Backend Routes (USER)

ID | Method | Path | Description |
--- | --- | --- | --- |
1 | POST | /user/signup | Guarda la información del registro del usuario|
2 | POST | /user/login  | Guarda la información de inicio de sesión del usuario |
3 | GET | /user/:username | Muestra el perfil del usuario (área privada) |
4 | GET | /user/logout  | Cierre de sesión |

## Backend Routes (POST)

ID | Method | Path | Description |
--- | --- | --- | --- |
1 | GET | /post/allPosts | Vista de todos los posts de usuarios |
2 | GET | /post/allUserPosts/:id | Vista de los posts creados por un solo usuario|
3 | POST | /post/newPost | Vista para crear new post |
4 | POST | /post/editPost | Vista para editar post |

## Frontend Routes
ID | Path | Description |
--- | --- | --- |
1 | /profile | Vista de perfil |
2 | /posts | Vista de todo los posts creados por el usuario |
3 | /edit | Vista de edición de posts |
4 | /new-post | Vista de nueva entrada |
4 | /liked | Vista de los posts que han gustado |

## Creator
Gabriela Gallango
