// Test login endpoint
const BASE_URL = 'https://jobportal-7i6p.onrender.com/api/v1';

async function testLogin() {
    console.log('Testing /user/login...');

    const loginData = {
        email: 'test@example.com', // Use an email you registered
        password: 'password123',
        role: 'student'
    };

    try {
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(loginData)
        });

        const data = await response.json();
        console.log('Response status:', response.status);
        console.log('Response data:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

testLogin();
