# Hermes Api

## Documentation

- How to use Hermes API with Axios

```node
import axios from "axios";

const api = axios.create({
  baseURL: "https://www.hermesapi.com.br",
});

const response = await api.post("/attendances", {
  question,
  origin: linkProduct,
});

console.log(response.data);
```
