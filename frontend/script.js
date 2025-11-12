// Basic frontend logic to call POST /url on the backend at http://localhost:8001
(function(){
  const form = document.getElementById('shorten-form');
  const input = document.getElementById('url-input');
  const resultSection = document.getElementById('result');
  const shortLink = document.getElementById('short-link');
  const copyBtn = document.getElementById('copy-btn');
  const openBtn = document.getElementById('open-btn');
  const message = document.getElementById('message');
  const notice = document.getElementById('notice');
  const clickCount = document.getElementById('click-count');

  const BACKEND_BASE = 'https://url-shortener-10es.onrender.com';

  function showMessage(text, isError){
    message.textContent = text || '';
    message.style.color = isError ? 'crimson' : '';
  }

  async function fetchAnalytics(shortId) {
    try {
      const res = await fetch(`${BACKEND_BASE}/url/analytics/${shortId}`);
      if (res.ok) {
        const data = await res.json();
        clickCount.textContent = data.totalClicks || 0;
      } else {
        clickCount.textContent = '0';
      }
    } catch (err) {
      clickCount.textContent = '0';
    }
  }

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    resultSection.classList.add('hidden');
    notice.textContent = '';
    showMessage('');

    const url = input.value.trim();
    if(!url){
      showMessage('Please enter a valid URL', true);
      return;
    }

    showMessage('Shortening...');

    try{
      const res = await fetch(`${BACKEND_BASE}/url`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({url}),
      });

      if(!res.ok){
        const err = await res.json().catch(()=>({error: res.statusText}));
        throw new Error(err && err.error ? err.error : res.statusText || 'Request failed');
      }

      const data = await res.json();
      if(!data.id){
        throw new Error('Unexpected response from server');
      }

      const final = `${BACKEND_BASE}/${data.id}`;
      shortLink.href = final;
      shortLink.textContent = final;
      
      // Fetch and display analytics
      await fetchAnalytics(data.id);
      
      resultSection.classList.remove('hidden');
      notice.textContent = 'Click Open to visit the short URL or Copy to copy it to clipboard.';
      showMessage('Shortened successfully');
    }catch(err){
      showMessage('Error: ' + err.message, true);
    }
  });

  copyBtn.addEventListener('click', async ()=>{
    const url = shortLink.href;
    try{
      await navigator.clipboard.writeText(url);
      showMessage('Copied to clipboard');
    }catch(_){
      // fallback
      const ta = document.createElement('textarea');
      ta.value = url; document.body.appendChild(ta); ta.select();
      try{document.execCommand('copy'); showMessage('Copied to clipboard');}catch(e){showMessage('Copy failed', true);} finally{ta.remove();}
    }
  });

  openBtn.addEventListener('click', ()=>{
    const url = shortLink.href;
    if(!url || url === '#') return;
    window.open(url, '_blank', 'noopener');
  });

})();
