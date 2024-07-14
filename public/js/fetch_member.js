const emailInput = document.querySelector('.cms-search.member input[type="email"]');
const _idInput = document.querySelector('.cms-search.member input[type="text"]');


fetch('/api/member')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    document.getElementById('member-email').textContent = data[2];
    document.getElementById('member-pswd').textContent = data.mppswd;
    document.getElementById('member-name').textContent = data.mpname;
    document.getElementById('member-username').textContent = data.mpusername;
    document.getElementById('member-gender').textContent = data.fgender;
    document.getElementById('member-gender').textContent = data.mgender;
    document.getElementById('member-china').textContent = data.mpchina;
    document.getElementById('member-japan').textContent = data.mpjapan;
    document.getElementById('member-korean').textContent = data.mpkorean;
    document.getElementById('member-taiwan').textContent = data.mptaiwan;
    document.getElementById('member-europe').textContent = data.mpeurope;
    document.getElementById('member-usa').textContent = data.mpusa;
    document.getElementById('member-england').textContent = data.mpengland;
    document.getElementById('member-canada').textContent = data.mpcanada;
    document.getElementById('member-cntoth').textContent = data.mpcntoth;
    document.getElementById('member-cntotd').textContent = data.mpcntotd;
    document.getElementById('member-airplan').textContent = data.mpairplan;
    document.getElementById('member-cruise').textContent = data.mpcruise;
    document.getElementById('member-train').textContent = data.mptrain;
    document.getElementById('member-rail').textContent = data.mprail;
    document.getElementById('member-tranoth').textContent = data.mptranoth;
    document.getElementById('member-tranotd').textContent = data.mptranotd;
    document.getElementById('member-imagepath').textContent = data.mpimagepath;
    document.getElementById('member-joindate').textContent = data.mpjoindate;

  })
  .catch(error => console.error('Error fetching end user data:', error));