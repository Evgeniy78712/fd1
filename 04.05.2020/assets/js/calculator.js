(function () {
  function vaultSwitch(current) {
    switch (current) {
      case 'RUB': vaultText.innerText = 'USD'; vaultText1.innerText = 'USD';
        break;
      case 'USD': vaultText.innerText = 'RUB'; vaultText1.innerText = 'RUB';
        break;
    }
  }

  function toRUB(amount) {
    var cently = ((amount * 100 - Math.floor(amount * 100)) * 100).toFixed();
    if (cently >= 100) { cently = 0; }
    var kopeyki = (Math.floor((amount - Math.floor(amount)) * 100)).toFixed();
    var rub = Math.floor(amount);
    return rub + '<span style="font-size: 0.6em"> руб.</span> ' + (kopeyki < 10 ? 0 : '') + kopeyki + '<span style="font-size: 0.8em">.' + (cently < 10 ? 0 : '') + cently + '</span>' + '<span style="font-size: 0.6em"> коп.</span>';
  }

  function toUSD(amount) {
    return '$' + formatNumber(amount);
  }

  function displayProfit(vault, profit) {
    var result;
    switch (vault) {
      case 'RUB': result = toRUB(profit); break;
      case 'USD': result = toUSD(profit); break;
    }
    profitEl.innerHTML = result;

  }

  var currentTimer = false;
  function restartTimer(secondely) {
    var profit = 0;
    if (currentTimer) {
      clearInterval(currentTimer);
    }
    displayProfit(vaultText.innerText, profit / 4);
    currentTimer = setInterval(function () {
      profit += secondely;
      displayProfit(vaultText.innerText, profit / 4);
    }, 250);
  }

  function formatNumber(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  function monthsSwitch(newValue) {
    var value = Number(summEl.value);
    var total = (1 + newValue * 0.1) * value;
    var monthly = value * 0.1;
    var dayly = monthly / 30;
    var hourly = dayly / 24;
    var minutely = hourly / 60;
    var secondely = minutely / 60;
    switch (true) {
      case (newValue >= 3 && newValue < 6):
        phoneEl.style.opacity = '1';
        carEl.style.opacity = '0.5';
        houseEl.style.opacity = '0.5';
        airplanEl.style.opacity = '0.5';
        restartTimer(secondely);

        break;
      case (newValue >= 6 && newValue < 9):
        phoneEl.style.opacity = '1';
        carEl.style.opacity = '1';
        houseEl.style.opacity = '0.5';
        airplanEl.style.opacity = '0.5';
        restartTimer(secondely);

        break;
      case (newValue >= 9 && newValue < 12):
        phoneEl.style.opacity = '1';
        carEl.style.opacity = '1';
        houseEl.style.opacity = '1';
        airplanEl.style.opacity = '0.5';
        restartTimer(secondely);

        break;
      case (newValue === 12):
        phoneEl.style.opacity = '1';
        carEl.style.opacity = '1';
        houseEl.style.opacity = '1';
        airplanEl.style.opacity = '1';
        restartTimer(secondely);

        break;
      default:
        phoneEl.style.opacity = '0.5';
        carEl.style.opacity = '0.5';
        houseEl.style.opacity = '0.5';
        airplanEl.style.opacity = '0.5';
        restartTimer(secondely);

        break;
    }


    totalEl.innerText = formatNumber(total);
    monthlyEl.innerText = formatNumber(monthly);
    daylyEl.innerText = formatNumber(dayly);
    hourlyEl.innerText = formatNumber(hourly);
    minutelyEl.innerText = formatNumber(minutely);
    secondelyEl.innerText = formatNumber(secondely);

    monthsText.innerText = newValue;
  }

  var sprite = document.createElement('img');
  sprite.src = 'assets/img/sprite.png';
  var mainEl = document.querySelector('[data-element=calculator]');
  mainEl.style.width = '580px';
  mainEl.style.height = '530px';
  mainEl.style.overflow = "hidden";
  mainEl.style.position = 'relative';
  mainEl.style.fontFamily = 'Arial';
  mainEl.style.fontSize = '18px';


  var bgEl = document.createElement('div');
  bgEl.style.position = 'absolute';
  bgEl.style.width = '580px';
  bgEl.style.height = '530px';
  bgEl.style.background = 'url(assets/img/sprite.png) no-repeat';
  mainEl.appendChild(bgEl);

  var airplanEl = document.createElement('div');
  airplanEl.style.position = 'absolute';
  airplanEl.style.width = '580px';
  airplanEl.style.height = '530px';
  airplanEl.style.background = 'url(assets/img/sprite.png) no-repeat';
  airplanEl.style.backgroundPosition = '0 -2120px';
  airplanEl.style.opacity = '0.5';
  mainEl.appendChild(airplanEl);

  var houseEl = document.createElement('div');
  houseEl.style.position = 'absolute';
  houseEl.style.width = '580px';
  houseEl.style.height = '530px';
  houseEl.style.background = 'url(assets/img/sprite.png) no-repeat';
  houseEl.style.backgroundPosition = '0 -1590px';
  houseEl.style.opacity = '0.5';
  mainEl.appendChild(houseEl);

  var carEl = document.createElement('div');
  carEl.style.position = 'absolute';
  carEl.style.width = '580px';
  carEl.style.height = '530px';
  carEl.style.background = 'url(assets/img/sprite.png) no-repeat';
  carEl.style.backgroundPosition = '0 -1060px';
  carEl.style.opacity = '0.5';
  mainEl.appendChild(carEl);

  var phoneEl = document.createElement('div');
  phoneEl.style.position = 'absolute';
  phoneEl.style.width = '580px';
  phoneEl.style.height = '530px';
  phoneEl.style.background = 'url(assets/img/sprite.png) no-repeat';
  phoneEl.style.backgroundPosition = '0 -530px';
  phoneEl.style.opacity = '0.5';
  mainEl.appendChild(phoneEl);

  var profitEl = document.createElement('div');
  profitEl.style.position = 'absolute';
  profitEl.style.top = '18px';
  profitEl.style.left = '340px';
  profitEl.style.height = '24px';
  profitEl.style.width = '140px';
  profitEl.style.fontWeight = 'normal';
  profitEl.style.color = '#e5f8b0';
  profitEl.style.lineHeight = '24px';
  profitEl.style.textAlign = 'center';
  mainEl.appendChild(profitEl);


  var summEl = document.createElement('input');
  summEl.addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^0-9]/gi, '');
    if (e.target.value.length > 7) {
      e.target.value = e.target.value.slice(0, -1);
    }
    monthsSwitch(Number(monthsText.innerText));
  });
  summEl.style.position = 'absolute';
  summEl.style.fontSize = '18px';
  summEl.style.left = '50px';
  summEl.style.top = '50px';
  summEl.style.border = 'none';
  summEl.style.outline = 'none';
  summEl.style.background = 'transparent';
  summEl.style.top = '50px';
  summEl.style.left = '203px';
  summEl.style.height = '24px';
  summEl.style.width = '70px';
  summEl.style.textAlign = 'right';
  summEl.value = 3000;
  mainEl.appendChild(summEl);

  var vaultSwitchEl = document.createElement('div');
  vaultSwitchEl.style.position = 'absolute';
  vaultSwitchEl.style.top = '51px';
  vaultSwitchEl.style.left = '292px';
  vaultSwitchEl.style.height = '24px';
  vaultSwitchEl.style.width = '35px';
  vaultSwitchEl.style.fontWeight = 'normal';
  vaultSwitchEl.style.color = '#e5f8b0';
  vaultSwitchEl.style.lineHeight = '24px';
  vaultSwitchEl.addEventListener('click', function (e) {
    if (e.target === vaultSwitchUp || e.target === vaultSwitchDown) {
      vaultSwitch(vaultText.innerText);
    }
  });
  vaultSwitchEl.addEventListener('selectstart', function (e) {
    e.preventDefault();
    return false;
  });
  var vaultText = document.createElement('span');
  vaultText.innerText = 'RUB';
  vaultSwitchEl.appendChild(vaultText);

  mainEl.appendChild(vaultSwitchEl);

  var vaultText1 = document.createElement('div');
  vaultText1.innerText = 'RUB';
  vaultText1.style.color = '#e5f8b0';
  vaultText1.style.position = 'absolute';
  vaultText1.style.left = '267px';
  vaultText1.style.top = '103px';
  mainEl.appendChild(vaultText1);

  var vaultSwitchUp = document.createElement('div');
  vaultSwitchUp.style.position = 'absolute';
  vaultSwitchUp.style.width = '20px';
  vaultSwitchUp.style.height = '6px';
  vaultSwitchUp.style.top = '-6px';
  vaultSwitchUp.style.left = '8px';
  vaultSwitchUp.style.cursor = 'pointer';
  vaultSwitchEl.appendChild(vaultSwitchUp);
  var vaultSwitchDown = document.createElement('div');
  vaultSwitchDown.style.position = 'absolute';
  vaultSwitchDown.style.width = '20px';
  vaultSwitchDown.style.height = '6px';
  vaultSwitchDown.style.bottom = '-6px';
  vaultSwitchDown.style.left = '8px';
  vaultSwitchDown.style.cursor = 'pointer';
  vaultSwitchEl.appendChild(vaultSwitchDown);

  var totalEl = document.createElement('div');
  totalEl.style.position = 'absolute';
  totalEl.style.width = '115px';
  totalEl.style.height = '20px';
  totalEl.style.top = '102px';
  totalEl.style.right = '330px';
  totalEl.style.fontWeight = 'normal';
  totalEl.style.color = '#e5f8b0';
  totalEl.style.lineHeight = '20px';
  totalEl.style.textAlign = 'right';
  mainEl.appendChild(totalEl);

  var monthlyEl = document.createElement('div');
  monthlyEl.style.position = 'absolute';
  monthlyEl.style.width = '115px';
  monthlyEl.style.height = '20px';
  monthlyEl.style.top = '148px';
  monthlyEl.style.right = '330px';
  monthlyEl.style.fontWeight = 'normal';
  monthlyEl.style.color = '#e5f8b0';
  monthlyEl.style.lineHeight = '20px';
  monthlyEl.style.textAlign = 'right';
  mainEl.appendChild(monthlyEl);

  var inMonth = document.createElement('div');
  inMonth.style.fontSize = '12px';
  inMonth.style.position = 'absolute';
  inMonth.style.width = '115px';
  inMonth.style.height = '20px';
  inMonth.style.top = '148px';
  inMonth.style.left = '266px';
  inMonth.style.fontWeight = 'normal';
  inMonth.style.color = '#e5f8b0';
  inMonth.style.lineHeight = '20px';
  inMonth.innerText = 'в месяц';
  mainEl.appendChild(inMonth);



  var daylyEl = document.createElement('div');
  daylyEl.style.position = 'absolute';
  daylyEl.style.width = '115px';
  daylyEl.style.height = '20px';
  daylyEl.style.top = '170px';
  daylyEl.style.right = '330px';
  daylyEl.style.fontWeight = 'normal';
  daylyEl.style.color = '#e5f8b0';
  daylyEl.style.lineHeight = '20px';
  daylyEl.style.textAlign = 'right';
  mainEl.appendChild(daylyEl);

  var inDay = document.createElement('div');
  inDay.style.fontSize = '12px';
  inDay.style.position = 'absolute';
  inDay.style.width = '115px';
  inDay.style.height = '20px';
  inDay.style.top = '170px';
  inDay.style.left = '266px';
  inDay.style.fontWeight = 'normal';
  inDay.style.color = '#e5f8b0';
  inDay.style.lineHeight = '20px';
  inDay.innerText = 'в день';
  mainEl.appendChild(inDay);


  var hourlyEl = document.createElement('div');
  hourlyEl.style.position = 'absolute';
  hourlyEl.style.width = '115px';
  hourlyEl.style.height = '20px';
  hourlyEl.style.top = '192px';
  hourlyEl.style.right = '330px';
  hourlyEl.style.fontWeight = 'normal';
  hourlyEl.style.color = '#e5f8b0';
  hourlyEl.style.lineHeight = '20px';
  hourlyEl.style.textAlign = 'right';
  mainEl.appendChild(hourlyEl);

  var inHour = document.createElement('div');
  inHour.style.fontSize = '12px';
  inHour.style.position = 'absolute';
  inHour.style.width = '115px';
  inHour.style.height = '20px';
  inHour.style.top = '192px';
  inHour.style.left = '266px';
  inHour.style.fontWeight = 'normal';
  inHour.style.color = '#e5f8b0';
  inHour.style.lineHeight = '20px';
  inHour.innerText = 'в час';
  mainEl.appendChild(inHour);


  var minutelyEl = document.createElement('div');
  minutelyEl.style.position = 'absolute';
  minutelyEl.style.width = '115px';
  minutelyEl.style.height = '20px';
  minutelyEl.style.top = '214px';
  minutelyEl.style.right = '330px';
  minutelyEl.style.fontWeight = 'normal';
  minutelyEl.style.color = '#e5f8b0';
  minutelyEl.style.lineHeight = '20px';
  minutelyEl.style.textAlign = 'right';
  mainEl.appendChild(minutelyEl);

  var inMinute = document.createElement('div');
  inMinute.style.fontSize = '12px';
  inMinute.style.position = 'absolute';
  inMinute.style.width = '115px';
  inMinute.style.height = '20px';
  inMinute.style.top = '214px';
  inMinute.style.left = '266px';
  inMinute.style.fontWeight = 'normal';
  inMinute.style.color = '#e5f8b0';
  inMinute.style.lineHeight = '20px';
  inMinute.innerText = 'в минуту';
  mainEl.appendChild(inMinute);


  var secondelyEl = document.createElement('div');
  secondelyEl.style.position = 'absolute';
  secondelyEl.style.width = '115px';
  secondelyEl.style.height = '20px';
  secondelyEl.style.top = '236px';
  secondelyEl.style.right = '330px';
  secondelyEl.style.fontWeight = 'normal';
  secondelyEl.style.color = '#e5f8b0';
  secondelyEl.style.lineHeight = '20px';
  secondelyEl.style.textAlign = 'right';
  mainEl.appendChild(secondelyEl);

  var inSecond = document.createElement('div');
  inSecond.style.fontSize = '12px';
  inSecond.style.position = 'absolute';
  inSecond.style.width = '115px';
  inSecond.style.height = '20px';
  inSecond.style.top = '236px';
  inSecond.style.left = '266px';
  inSecond.style.fontWeight = 'normal';
  inSecond.style.color = '#e5f8b0';
  inSecond.style.lineHeight = '20px';
  inSecond.innerText = 'в секунду';
  mainEl.appendChild(inSecond);


  var percentEl = document.createElement('div');
  percentEl.style.position = 'absolute';
  percentEl.style.top = '51px';
  percentEl.style.left = '390px';
  percentEl.style.height = '24px';
  percentEl.style.width = '35px';
  percentEl.style.fontWeight = 'normal';
  percentEl.style.color = '#e5f8b0';
  percentEl.style.lineHeight = '24px';
  percentEl.innerText = '10%';
  mainEl.appendChild(percentEl);

  var monthsEl = document.createElement('div');
  monthsEl.style.position = 'absolute';
  monthsEl.style.top = '101px';
  monthsEl.style.left = '360px';
  monthsEl.style.height = '24px';
  monthsEl.style.width = '24px';
  monthsEl.style.fontWeight = 'normal';
  monthsEl.style.color = '#e5f8b0';
  monthsEl.style.lineHeight = '24px';
  monthsEl.style.textAlign = 'center';
  var monthsText = document.createElement('span');
  monthsText.innerText = '';
  monthsSwitch(12);
  monthsEl.appendChild(monthsText);
  mainEl.appendChild(monthsEl);


  var monthsSwitchUp = document.createElement('div');
  monthsSwitchUp.style.position = 'absolute';
  monthsSwitchUp.style.width = '20px';
  monthsSwitchUp.style.height = '6px';
  monthsSwitchUp.style.top = '-6px';
  monthsSwitchUp.style.left = '2px';
  monthsSwitchUp.style.cursor = 'pointer';
  monthsEl.appendChild(monthsSwitchUp);

  var monthsSwitchDown = document.createElement('div');
  monthsSwitchDown.style.position = 'absolute';
  monthsSwitchDown.style.width = '20px';
  monthsSwitchDown.style.height = '6px';
  monthsSwitchDown.style.bottom = '-6px';
  monthsSwitchDown.style.left = '2px';
  monthsSwitchDown.style.cursor = 'pointer';
  monthsEl.appendChild(monthsSwitchDown);
  monthsEl.addEventListener('selectstart', function (e) {
    e.preventDefault();
    return false;
  });
  monthsEl.addEventListener('click', function (e) {
    var months = Number(monthsText.innerText);
    if (e.target === monthsSwitchUp) {
      if (months < 12) {
        monthsSwitch(months + 1);
        return;
      }
    }
    if (e.target === monthsSwitchDown) {
      if (months > 1) {
        monthsSwitch(months - 1);
        return;
      }
    }
  });




})();