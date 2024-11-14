## 🧪Repositorio para prueba técnica

### Cómo empezar:

1. **Clona el Proyecto**:
    ```
    git clone https://github.com/xGabe/RepoPruebaTecnica.git
    ```

---

2. **Instala todas las dependencias del proyecto (incluyendo Cypress) con npm**:
    ```
    npm install
    ```

---

3. **Para correr las pruebas ejecuta**:
    ```
    npm run run:test
    ```
    - cuyo script es un: ` npx cypress run --browser chrome`, 
      el cual es un atajo para que ejecutar las pruebas en modo headless usando el navegador de chrome
      
    - Puedes utilizar también
      ```
      npm test
      ```
      que sirve para ejecutar las pruebas en modo interactivo
---

### 🚩IMPORTANTE

En el repositorio se encontrará un pipeline para correr las pruebas que se ejecuta al hacer push o mergue a master
