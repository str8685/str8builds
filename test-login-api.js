import fetch from 'node-fetch';

async function testLoginAPI() {
  try {
    console.log('Testing login API...');
    
    const response = await fetch('http://localhost:8081/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@str8build.com',
        password: 'admin'
      })
    });
    
    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('User details:', data.user);
    } else {
      console.log('❌ Login failed:', data.error);
    }
    
  } catch (error) {
    console.error('Error testing login API:', error);
  }
}

testLoginAPI();
