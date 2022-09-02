<template>
  <div>
    <template v-if="(!cookiesSet || showCookieBar || show) && !closedTemporary" v-cloak>
      <div
          class="md-min:hidden z-40 w-full h-full bg-gradient-to-t from-[#000] via-[#000] to-transparent pointer-events-none fixed top-0 left-0 right-0 bottom-0 opacity-60"></div>

      <div class="fixed right-[32px] bottom-0 w-[310px] font-sans drop-shadow-[0_1px_24px_rgba(0,0,0,0.16)] z-50 xs:right-0 xs:left-0 xs:w-full bg-[#FFF] shadow-2xl">
        <div
            class="bg-[#000000] w-[32px] h-[32px] flex items-center justify-center absolute top-0 right-0 cursor-pointer transition-all hover:bg-opacity-70"
            @click="closeCookieBar()">
          <svg height="12" viewBox="0 0 12 12" width="12" xmlns="http://www.w3.org/2000/svg">
            <path
                d="m17.27275 16 3.846-3.846.793125-.793125c.117-.117.117-.307125 0-.424125l-.848625-.848625c-.117-.117-.307125-.117-.424125 0l-4.639125 4.639125-4.639125-4.6395c-.117-.117-.307125-.117-.424125 0l-.849.848625c-.117.117-.117.307125 0 .424125l4.6395 4.6395-4.6395 4.639125c-.117.117-.117.307125 0 .424125l.848625.848625c.117.117.307125.117.424125 0l4.6395-4.639125 3.846 3.846.793125.793125c.117.117.307125.117.424125 0l.848625-.848625c.117-.117.117-.307125 0-.424125z"
            <path
                d="m17.27275 16 3.846-3.846.793125-.793125c.117-.117.117-.307125 0-.424125l-.848625-.848625c-.117-.117-.307125-.117-.424125 0l-4.639125 4.639125-4.639125-4.6395c-.117-.117-.307125-.117-.424125 0l-.849.848625c-.117.117-.117.307125 0 .424125l4.6395 4.6395-4.6395 4.639125c-.117.117-.117.307125 0 .424125l.848625.848625c.117.117.307125.117.424125 0l4.6395-4.639125 3.846 3.846.793125.793125c.117.117.307125.117.424125 0l.848625-.848625c.117-.117.117-.307125 0-.424125z"
                fill="#fff" transform="translate(-10 -10)"/>
          </svg>
        </div>

        <div class="pt-[24px] px-[16px] pb-[32px] bg-[#F7F7F7]">
          <div class="flex justify-start items-center mb-[8px]">
            <img src="/img/icons/cookie.svg" alt="•">
            <p class="text-[20px] font-bold ml-[8px]">Cookies & privacy</p>
          </div>

          <p class="text-[15px] leading-[24px] text-[#000] text-opacity-70">Wij maken gebruik van functionele en
            analystische cookies voor optimalisatie en statistieken.</p>

          <div class="flex mt-[16px] mb-[-8px] block" v-show-slide="showOptions" v-cloak>
            <a href="/privacyverklaring" class="underline text-[13px] mr-[20px] transition hover:opacity-50">Privacyverklaring</a>
            <a href="/cookie-verklaring" class="underline text-[13px] transition hover:opacity-50">Cookieverklaring</a>
          </div>
        </div>

        <div v-show-slide="showOptions" v-cloak>
          <div class="pb-[20px]">
            <label for="essential"
                   class="!pointer-events-none !cursor-default flex justify-between p-[16px] border-t border-[#E9E9E9]">
                        <span>
                            <i class="fas fa-lock-alt text-[14px] text-[#000] text-opacity-30 mr-[4px] transform translate-y-[-1px]"></i>
                            <span class="text-[#000] text-opacity-50">Noodzakelijk</span>
                        </span>

              <span
                  class="relative inline-block w-[48px] ml-[16px] align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox"
                                   name="essential"
                                   id="essential"
                                   checked
                                   class="toggle-checkbox disabled absolute block w-[24px] h-[24px] rounded-full bg-white border-2 border-[#D2D2D2] appearance-none cursor-pointer transition-all"/>
                            <span
                                class="toggle-label block overflow-hidden h-[24px] rounded-full bg-[#D2D2D2] cursor-pointer"></span>
                            <svg class="absolute top-[8px] right-[6px]" height="9" viewBox="0 0 12 9" width="12"
                                 xmlns="http://www.w3.org/2000/svg"><path
                                d="m34.9240751 16.773066c-.2342936.2341401-.6139957.2341401-.8482893 0l-3.9001808-3.9001808c-.23414-.2342936-.23414-.6139957 0-.8482893l.8482894-.8486643c.1125309-.1125567.2651711-.1757925.4243321-.1757925s.3118012.0632358.4243322.1757925l2.6273718 2.6273717 5.6275108-5.62751078c.112531-.11255668.2651712-.17579252.4243322-.17579252s.3118012.06323584.4243321.17579252l.8482894.84866433c.23414.23429359.23414.61399573 0 .84828932z"
                                fill="#d2d2d2" transform="translate(-30 -8)"/></svg>
                        </span>
            </label>

            <label for="statistics" class="cursor-pointer flex justify-between p-[16px] border-t border-[#E9E9E9]">
              <span class="text-[#000]">Statistieken</span>

              <span
                  class="relative inline-block w-[48px] ml-[16px] align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox"
                                   id="statistics"
                                   v-model="statistics"
                                   class="toggle-checkbox absolute block w-[24px] h-[24px] rounded-full bg-white border-2 border-[#D2D2D2] appearance-none cursor-pointer transition-all"/>
                            <span
                                class="toggle-label block overflow-hidden h-[24px] rounded-full bg-[#D2D2D2] cursor-pointer"></span>
                            <svg class="absolute top-[8px] right-[6px] transition" height="9" viewBox="0 0 12 9"
                                 width="12" xmlns="http://www.w3.org/2000/svg"><path
                                d="m34.9240751 16.773066c-.2342936.2341401-.6139957.2341401-.8482893 0l-3.9001808-3.9001808c-.23414-.2342936-.23414-.6139957 0-.8482893l.8482894-.8486643c.1125309-.1125567.2651711-.1757925.4243321-.1757925s.3118012.0632358.4243322.1757925l2.6273718 2.6273717 5.6275108-5.62751078c.112531-.11255668.2651712-.17579252.4243322-.17579252s.3118012.06323584.4243321.17579252l.8482894.84866433c.23414.23429359.23414.61399573 0 .84828932z"
                                fill="#38C172" transform="translate(-30 -8)"/></svg>
                        </span>
            </label>

            <label for="marketing" class="cursor-pointer flex justify-between p-[16px] border-t border-[#E9E9E9]">
              <span class="text-[#000]">Marketing</span>

              <span
                  class="relative inline-block w-[48px] ml-[16px] align-middle select-none transition duration-200 ease-in">
                            <input type="checkbox"
                                   id="marketing"
                                   v-model="marketing"
                                   class="toggle-checkbox absolute block w-[24px] h-[24px] rounded-full bg-white border-2 border-[#D2D2D2] appearance-none cursor-pointer transition-all"/>
                            <span
                                class="toggle-label block overflow-hidden h-[24px] rounded-full bg-[#D2D2D2] cursor-pointer"></span>
                             <svg class="absolute top-[8px] right-[6px] transition" height="9" viewBox="0 0 12 9"
                                  width="12" xmlns="http://www.w3.org/2000/svg"><path
                                 d="m34.9240751 16.773066c-.2342936.2341401-.6139957.2341401-.8482893 0l-3.9001808-3.9001808c-.23414-.2342936-.23414-.6139957 0-.8482893l.8482894-.8486643c.1125309-.1125567.2651711-.1757925.4243321-.1757925s.3118012.0632358.4243322.1757925l2.6273718 2.6273717 5.6275108-5.62751078c.112531-.11255668.2651712-.17579252.4243322-.17579252s.3118012.06323584.4243321.17579252l.8482894.84866433c.23414.23429359.23414.61399573 0 .84828932z"
                                 fill="#38C172" transform="translate(-30 -8)"/></svg>
                        </span>
            </label>
          </div>
        </div>

        <div class="flex px-[16px] py-[24px] border-t border-[#E9E9E9] relative">
          <button @click="toggleOptions"
                  class="absolute top-0 left-0 right-0 mx-auto rounded-full border-solid bg-white w-[32px] h-[32px] flex items-center justify-center border border-[#E9E9E9] transform translate-y-[-22px] focus:outline-none">
            <svg class="transform transition-all" :class="{ 'rotate-180': showOptions }" height="13" viewBox="0 0 12 13"
                 width="12" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="m16.2229021 9.1541958 5.4335664 5.3895105c.1725525.1725524.1725525.4515734 0 .6241259l-.726923.726923c-.1725525.1725525-.4515735.1725525-.6241259 0l-4.3945804-4.3505244-4.3945805 4.3505244c-.1725524.1725525-.4515734.1725525-.6241258 0l-.7269231-.726923c-.17255246-.1725525-.17255246-.4515735 0-.6241259l5.4335664-5.3895105c.1725525-.17255244.4515735-.17255244.6241259 0zm-.6241259 5.8741259-5.4335664 5.3895105c-.17255246.1725524-.17255246.4515734 0 .6241258l.7269231.7269231c.1725524.1725525.4515734.1725525.6241258 0l4.3945805-4.3505245 4.3945804 4.3505245c.1725524.1725525.4515734.1725525.6241259 0l.726923-.7269231c.1725525-.1725524.1725525-.4515734 0-.6241258l-5.4335664-5.3895105c-.1725524-.1725525-.4515734-.1725525-.6241259 0z"
                  transform="translate(-10 -9)"/>
            </svg>
          </button>

          <button class="bg-[#000] text-white px-[32px] py-[12px] transition-all hover:bg-opacity-70 flex-1"
                  :style="[{ 'background-color': btn_bg_color }, { 'color': btn_text_color }]"
                  @click="setCookies()">
            <span v-html="showOptions ? 'Opslaan' : 'Ik ga akkoord'"></span>
          </button>

          <div
              class="flex justify-center items-center px-[16px] text-opacity-80 underline outline-none hover:text-opacity-100">
            <button class="outline-none" @click="toggleOptions">Instellen</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Cookies from "js-cookie";

window.dataLayer.push(function() {
  this.reset();
})

export default {
  name: "CookieBar",
  props: ['reset', 'btn_bg_color', 'btn_text_color'],
  data() {
    return {
      cookiesSet: Cookies.get('cookiesSet') === 'true',
      showOptions: false,
      showCookieBar: false,
      statistics: Cookies.get('statistics') === 'true',
      marketing: Cookies.get('marketing') === 'true',
      show: this.reset,
      closedTemporary: Cookies.get('closedTemporary') === 'true'
    };
  },

  watch: {
    reset: function(val) {
      this.show = val;
      this.closedTemporary = false;
    }
  },

  mounted() {
    if (!this.cookiesSet) {
      this.statistics = true;
      this.marketing = true;
    }

    this.addCookies();
  },

  methods: {
    setCookies() {
      if (!this.showOptions) {
        Cookies.set('statistics', true, { expires: 365 });
        Cookies.set('marketing', true, { expires: 365 });
      } else {
        Cookies.set('statistics', this.statistics, { expires: 365 });
        Cookies.set('marketing', this.marketing, { expires: 365 });
      }

      this.addCookies();

      this.cookiesSet = true;
      Cookies.set('cookiesSet', true, { expires: 365 });
      this.showCookieBar = false;
      this.show = false;
    },

    addCookies() {
      dataLayer.push({ 'event': 'cookie_essential'});

      if (this.statistics) {
        dataLayer.push({ 'event': 'cookie_statistics'});
      }

      if (this.marketing) {
        dataLayer.push({ 'event': 'cookie_marketing'});
      }
    },

    toggleOptions() {
      this.showOptions = !this.showOptions;
    },

    closeCookieBar() {
      this.cookiesSet = true;
      this.showCookieBar = false;
      this.showOptions = false;
      this.show = false;
      this.$emit('status', false);
      Cookies.set('closedTemporary', true, {expires: 1});
    },

    toggleCookieBar() {
      this.showCookieBar = true;
    }
  },
}
</script>
