# Oylan Car Demo

This is a demo project showcasing the usage of the Oylan API to upload car images and get descriptions.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/IS2AI/oylan_car_demo
    cd oylan_car_demo
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Environment Variables

To run this project, you need to set up the following environment variable:

- `NEXT_PUBLIC_OYLAN_API_KEY`: Your API key for the Oylan API.

You can obtain the API key from [Oylan Documentation](https://oylan.nu.edu.kz/documentation/).

Create a `.env.local` file in the root of your project and add the following line:

```env
NEXT_PUBLIC_OYLAN_API_KEY=your_api_key_here
```

## Usage

1. Replace the `assistant_id` value in `src/app/page.tsx` with your actual assistant ID obtained from the Oylan Documentation.

2. Start the development server:
    ```bash
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:3000`.

4. Upload a car image and get the description.

## License

This project is licensed under the MIT License.
