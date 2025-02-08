# nodejs-env-loader

**nodejs-env-loader** is a Node.js utility that simplifies the loading of environment variables from a `.env` file into your application's `process.env`. This approach enhances the management of configuration settings, especially secrets, without hardcoding them into your source code.

## Features

- **Secure Loading**: Ensures that environment variables are loaded without overwriting critical system variables.
- **Customizable**: Allows specifying custom paths, encoding, and override options.
- **Safe File Access**: Prevents loading files outside the current working directory to maintain security.
- **Cross-Platform Support**: Handles different newline formats (Windows, Unix) seamlessly.

## Installation

### From npm

To install the package from npm, run:

```bash
npm install nodejs-env-loader
```

### Using Different Package Managers

#### yarn (Fast, reliable, and secure dependency management)
```bash
yarn add nodejs-env-loader
```

#### pnpm (Efficient package manager with disk space optimization)
```bash
pnpm add nodejs-env-loader
```

#### bun (Modern JavaScript runtime with built-in package manager)
```bash
bun add nodejs-env-loader
```

### Local Installation

If you prefer to install it locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/CodeItAftab/nodejs-env-loader.git
   ```
2. Navigate to the project directory:
   ```bash
   cd nodejs-env-loader
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Link the package globally for local testing:
   ```bash
   npm link
   ```
5. Use the package in another local project:
   ```bash
   cd ../your-project
   npm link nodejs-env-loader
   ```

## Usage

1. **Create a `.env` File**: In the root of your project, create a `.env` file containing your environment variables:
   
   ```ini
   # .env
   DATABASE_URL=your-database-url
   API_KEY=your-api-key
   PORT=3000
   DEBUG_MODE=true
   ```

2. **Load Environment Variables**: In your application entry point (e.g., `index.js`), load the environment variables using `nodejs-env-loader`:

   ```javascript
   const { load } = require('nodejs-env-loader');

   const result = load();

   if (result.error) {
     console.error('Error loading .env file:', result.error);
   } else {
     console.log('Environment variables loaded:', result.parsed);
   }

   // Now you can access your environment variables via process.env
   console.log('Database URL:', process.env.DATABASE_URL);
   ```

## API

### `load(options)`

Loads environment variables from a specified `.env` file into `process.env`.

#### Parameters

| Parameter | Type    | Default | Description |
|-----------|--------|---------|-------------|
| `path`    | string | `.env`  | Path to the `.env` file. |
| `override` | boolean | `false` | If `true`, existing environment variables will be overwritten. |
| `encoding` | string | `utf-8` | File encoding. |

#### Returns

| Property | Type   | Description |
|----------|--------|-------------|
| `parsed` | object | Key-value pairs from the `.env` file. |
| `error`  | Error  | Error object if the `.env` file could not be loaded. |

#### Example

```javascript
const { load } = require('nodejs-env-loader');

const result = load({ path: './config/.env', override: true });

if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('Environment variables loaded:', result.parsed);
}
```

## Important Notes

- **Protected Environment Variables**: The loader prevents overwriting critical system environment variables such as `PATH`, `HOME`, `USER`, etc., unless explicitly allowed via the `override` option.
- **File Security**: To maintain security, the loader restricts loading `.env` files outside the current working directory.
- **Cross-Platform Compatibility**: Automatically normalizes line endings for different operating systems.

## Contributing

We welcome contributions! Follow these steps to contribute:

1. **Fork the Repository**: Click the "Fork" button on the repository page.
2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/your-username/nodejs-env-loader.git
   ```
3. **Create a Branch**:
   ```bash
   git checkout -b my-feature-branch
   ```
4. **Make Changes & Commit**:
   ```bash
   git add .
   git commit -m "Add new feature"
   ```
5. **Push to Your Fork**:
   ```bash
   git push origin my-feature-branch
   ```
6. **Create a Pull Request**: Go to the original repository on GitHub and open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For more information, visit the [GitHub repository](https://github.com/CodeItAftab/nodejs-env-loader).

