# Teslo DB

- Ejecuta el siguiente comando para levantar los contenedores de Docker:

    ```bash
    docker-compose up -d
    ```

## WS

- Genera un recurso de WebSockets con NestJS:
    - Ejecuta el siguiente comando para generar el recurso de WebSockets:

        ```bash
        nest g res messagesWs --no-spec
        ```

        - Selecciona la opción **webSockets**
        - No selecciones CRUD