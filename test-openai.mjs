import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log('NO API KEY FOUND!');
    return;
  }
  console.log('Using API Key:', apiKey.substring(0, 15) + '...' + apiKey.substring(apiKey.length - 5));
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Say strictly the word test' }]
      })
    });
    
    if (!response.ok) {
      console.error('FAILED!', response.status, await response.text());
      return;
    }
    const data = await response.json();
    console.log('SUCCESS!', data.choices[0].message.content);
  } catch (e) {
    console.error('CRASHED!', e);
  }
}
main();
