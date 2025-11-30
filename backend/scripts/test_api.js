// Native fetch and FormData in Node 22

const BASE_URL = 'https://jobportal-7i6p.onrender.com/api/v1';

async function testRegister() {
    console.log('Testing /user/register...');
    const formData = new FormData();
    formData.append('fullname', 'Test User');
    formData.append('email', `test${Date.now()}@example.com`);
    formData.append('phoneNumber', '1234567890');
    formData.append('password', 'password123');
    formData.append('role', 'student');
    // Not appending file initially to test the optional file logic

    try {
        const response = await fetch(`${BASE_URL}/user/register`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log('Response:', response.status, data);
    } catch (error) {
        console.error('Error:', error);
    }
}

testRegister();
