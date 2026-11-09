import { Fragment } from 'react';
import { StoryPerson } from './StoryPerson';
import { StoryBasket } from './StoryBasket';
import { useLang } from '../../i18n/LangContext';

export function StorySvg({ svgRef, nodesRef }) {
  const { t } = useLang();
  const bind = (...names) => node => { names.forEach(name => { nodesRef.current[name] = node; }); };
  const productColors = ['#e8ecf4', '#5aa8ff', '#ffb23e', '#22c38e', '#f0455a', '#a78bfa'];
  return (
    <svg id="story" viewBox="0 30 1200 410" role="img" aria-label={t.story.sceneLabel} ref={svgRef}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1" ref={bind("sky")}>
          <stop offset="0" stopColor="#101a30" />
          <stop offset="1" stopColor="#16233d" />
        </linearGradient>
        <g id="box" ref={bind("box")}>
          <rect x="-11" y="-11" width="22" height="22" rx="3" fill="#c98b4f" />
          <path d="M-11 -3H11M0 -11V-3" stroke="#8d5a2b" strokeWidth="2" />
        </g>
      </defs>
      <rect x="0" y="30" width="1200" height="410" fill="url(#sky)" />
      <g fontFamily="Figtree,sans-serif">
        <polygon points="28,205 120,165 212,205" fill="#2a3858" />
        <rect x="38" y="203" width="164" height="155" fill="#1d2a45" stroke="#2f3e60" strokeWidth="2" />
        <rect id="supglow" x="38" y="203" width="164" height="155" fill="#a78bfa" opacity="0" ref={bind("supglow")} />
        <text x="120" y="228" textAnchor="middle" fontWeight="800" fontSize="13" fill="#ffb23e" letterSpacing="2">{t.story.labels.suppliers}</text>
        <g fontWeight="800" fontSize="10" textAnchor="middle">
          <rect x="52" y="238" width="40" height="18" rx="3" fill="#22c38e" />
          <text x="72" y="251" fill="#06281c">{t.story.labels.dairy}</text>
          <rect x="100" y="238" width="40" height="18" rx="3" fill="#ffb23e" />
          <text x="120" y="251" fill="#2a1600">{t.story.labels.rice}</text>
          <rect x="148" y="238" width="40" height="18" rx="3" fill="#5aa8ff" />
          <text x="168" y="251" fill="#071a33">{t.story.labels.fmcg}</text>
        </g>
        <rect x="78" y="272" width="84" height="86" fill="#0c1528" />
        <use href="#box" x="98" y="346" />
        <use href="#box" x="122" y="346" />
        <use href="#box" x="146" y="346" />
        <use href="#box" x="110" y="322" />
        <use href="#box" x="134" y="322" />
        <rect x="280" y="140" width="630" height="14" rx="3" fill="#ff6b0f" />
        <rect x="290" y="152" width="610" height="206" fill="#1d2a45" stroke="#2f3e60" strokeWidth="2" />
        <rect x="465" y="104" width="260" height="36" rx="6" fill="#ff6b0f" />
        <text x="595" y="128" textAnchor="middle" fontFamily="'Bricolage Grotesque',Figtree,sans-serif" fontWeight="800" fontSize="16" fill="#160800" letterSpacing="1">{t.story.labels.store}</text>
        <rect x="292" y="154" width="108" height="202" fill="#17223a" />
        <rect x="398" y="154" width="4" height="128" fill="#2f3e60" />
        <text x="346" y="226" textAnchor="middle" fontWeight="700" fontSize="10" fill="#8e9ab2" letterSpacing="1.5">{t.story.labels.storeRoom}</text>
        <rect x="302" y="164" width="88" height="44" rx="8" fill="#0b1426" stroke="#22c38e" strokeWidth="1.5" />
        <text x="346" y="180" textAnchor="middle" fontWeight="700" fontSize="9.5" fill="#8e9ab2" letterSpacing="1">{t.story.labels.stock}</text>
        <text id="stockn" x="346" y="200" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontWeight="700" fontSize="16" fill="#4fe0ad" ref={bind("stockn")}>{t.story.labels.openingStock}</text>
        <g id="stack" ref={bind("stack")}>
          <use href="#box" x="318" y="346" opacity="0" ref={bind("stack:0")} />
          <use href="#box" x="344" y="346" opacity="0" ref={bind("stack:1")} />
          <use href="#box" x="370" y="346" opacity="0" ref={bind("stack:2")} />
          <use href="#box" x="331" y="324" opacity="0" ref={bind("stack:3")} />
          <use href="#box" x="357" y="324" opacity="0" ref={bind("stack:4")} />
          <use href="#box" x="344" y="302" opacity="0" ref={bind("stack:5")} />
        </g>
        <g fill="#3a4a6e">
          <rect x="420" y="186" width="6" height="172" />
          <rect x="574" y="186" width="6" height="172" />
          <rect x="420" y="222" width="160" height="5" />
          <rect x="420" y="272" width="160" height="5" />
          <rect x="420" y="322" width="160" height="5" />
        </g>
        <g id="shelf" ref={bind('shelf')}>
          {Array.from({ length: 24 }, (_, index) => {
            const row = Math.floor(index / 8), column = index % 8;
            const height = [24, 20, 28][row] - (column % 3) * 2;
            return <rect key={index} x={428 + column * 18.5} y={[222, 272, 322][row] - height} width="14" height={height} rx="2"
              fill={productColors[(index * 7 + row) % 6]} opacity={index < 6 ? '1' : '0'} ref={bind('prods:' + index)} />;
          })}
        </g>
        <g id="counters" ref={bind('counters')}>
          {[640, 735, 830].map((x, index) => <Fragment key={x}>
            <text x={x} y="240" textAnchor="middle" fontWeight="700" fontSize="10" fill="#8e9ab2" letterSpacing="1.5">{t.story.labels['counter' + (index + 1)]}</text>
            <rect x={x - 14} y="286" width="4" height="12" fill="#5a77a8" />
            <rect x={x - 28} y="268" width="32" height="20" rx="2" fill="#163056" stroke="#5a77a8" strokeWidth="2" ref={bind('mons:' + index)} />
            <rect x={x - 34} y="296" width="68" height="7" rx="2" fill="#3a4c74" />
            <rect x={x - 30} y="303" width="60" height="55" rx="3" fill="#2b3b5e" />
            <line x1={x + 6} y1="293" x2={x + 30} y2="293" stroke="#f0455a" strokeWidth="3" strokeLinecap="round" opacity="0" ref={bind('beams:' + index)} />
            <rect x={x + 12} y="296" width="12" height="0" fill="#fbfaf6" ref={bind('rcs:' + index)} />
            <StoryPerson transform={'translate(' + (x - 48) + ',358)'} shirt="#ff6b0f" skin="#c98d62" hair="#2a2a2a" />
          </Fragment>)}
        </g>
        <rect x="894" y="288" width="8" height="70" fill="#4a5f8a" />
        <g transform="translate(985,40)">
          <rect width="64" height="44" fill="#1d2a45" stroke="#2f3e60" strokeWidth="1.5" />
          <rect id="br2hl" width="64" height="44" fill="#22c38e" opacity="0" ref={bind("br2hl")} />
          <rect y="-6" width="64" height="8" fill="#22c38e" />
          <rect x="24" y="22" width="16" height="22" fill="#0c1528" />
          <text x="32" y="60" textAnchor="middle" fontSize="10" fill="#c7d0e4" fontWeight="700" letterSpacing="1">{t.story.labels.galle}</text>
        </g>
        <g transform="translate(1100,40)">
          <rect width="64" height="44" fill="#1d2a45" stroke="#2f3e60" strokeWidth="1.5" />
          <rect id="br3hl" width="64" height="44" fill="#8b7bff" opacity="0" ref={bind("br3hl")} />
          <rect y="-6" width="64" height="8" fill="#8b7bff" />
          <rect x="24" y="22" width="16" height="22" fill="#0c1528" />
          <text x="32" y="60" textAnchor="middle" fontSize="10" fill="#c7d0e4" fontWeight="700" letterSpacing="1">{t.story.labels.negombo}</text>
        </g>
        <rect x="1000" y="140" width="150" height="28" rx="5" fill="#5aa8ff" />
        <text x="1075" y="159" textAnchor="middle" fontWeight="800" fontSize="12" fill="#071a33" letterSpacing="1.5">{t.story.labels.headOffice}</text>
        <rect x="975" y="168" width="200" height="190" fill="#1d2a45" stroke="#2f3e60" strokeWidth="2" />
        <rect x="992" y="186" width="166" height="104" rx="4" fill="#0b1426" stroke="#5a77a8" strokeWidth="2" />
        <text x="1002" y="204" fontSize="9.5" fill="#8e9ab2" fontWeight="700" letterSpacing="1">{t.story.labels.branchSummary}</text>
        <text id="hqnum" x="1150" y="224" textAnchor="end" fontFamily="'JetBrains Mono',monospace" fontSize="14" fill="#e8ecf4" fontWeight="700" ref={bind("hqnum")}>{t.story.labels.openingSales}</text>
        <g id="hqbars" ref={bind('hqbars')}>
          {[30, 42, 36, 50, 44, 58].map((height, index) => <rect key={index} x={1004 + index * 25} y={282 - height} width="16" height={height} rx="2" fill={index === 5 ? '#22c38e' : '#ff6b0f'} ref={bind('hqb:' + index)} />)}
        </g>
        <rect x="1030" y="300" width="90" height="8" rx="2" fill="#3a4c74" />
        <rect x="1036" y="308" width="6" height="50" fill="#3a4c74" />
        <rect x="1108" y="308" width="6" height="50" fill="#3a4c74" />
      </g>
      <rect x="0" y="358" width="1200" height="8" fill="#26324c" />
      <rect x="0" y="366" width="1200" height="74" fill="#1a2336" />
      <path d="M0 404H1200" stroke="#56627d" strokeWidth="3" strokeDasharray="22 18" />
      <g id="dyn" fontFamily="Figtree,sans-serif" opacity="0" ref={bind("dyn")}>
        <g id="people" ref={bind('people')}>
          <StoryPerson transform="translate(1075,358)" shirt="#5aa8ff" skin="#e9b98d" hair="#2a2a2a" />
          <StoryPerson transform="translate(395,358)" nodeRef={bind('stocker')} animated shirt="#ff6b0f" skin="#e9b98d" hair="#1b1b1b">
            <g className="bk" opacity="0"><use href="#box" transform="translate(0,-72) scale(.7)" /></g>
          </StoryPerson>
          {[
            { x: 684, shirt: '#22c38e', skin: '#c98d62', hair: '#1b1b1b' },
            { x: 779, shirt: '#a78bfa', skin: '#e9b98d', hair: '#5a3a1a' },
            { x: 874, shirt: '#ffb23e', skin: '#b07850', hair: '#1b1b1b' },
          ].map((person, index) => <StoryPerson key={person.x} transform={'translate(' + person.x + ',358)'}
            nodeRef={bind('cust:' + index)} animated opacity="0" shirt={person.shirt} skin={person.skin} hair={person.hair}><StoryBasket /></StoryPerson>)}
        </g>
        <path id="tr0" d="M595 104 Q840 10 1075 190" stroke="#ff6b0f" strokeWidth="2.5" strokeDasharray="6 8" fill="none" opacity="0" ref={bind("tr0")} />
        <path id="tr1" d="M1017 84 Q1030 140 1060 190" stroke="#22c38e" strokeWidth="2.5" strokeDasharray="6 8" fill="none" opacity="0" ref={bind("tr1")} />
        <path id="tr2" d="M1132 84 Q1120 140 1090 190" stroke="#8b7bff" strokeWidth="2.5" strokeDasharray="6 8" fill="none" opacity="0" ref={bind("tr2")} />
        <path id="trpo" d="M1075 186 Q600 -60 120 200" stroke="#a78bfa" strokeWidth="2.5" strokeDasharray="6 8" fill="none" opacity="0" ref={bind("trpo")} />
        <g id="lorry" transform="translate(30,392)" ref={bind("lorry")}>
          <rect x="0" y="-86" width="128" height="70" rx="4" fill="#e8ecf4" />
          <text x="64" y="-46" textAnchor="middle" fontFamily="'Bricolage Grotesque',Figtree,sans-serif" fontWeight="800" fontSize="20" fill="#ff6b0f">{t.story.labels.brand}</text>
          <text x="64" y="-28" textAnchor="middle" fontWeight="700" fontSize="10" fill="#56627d" letterSpacing="2">{t.story.labels.delivery}</text>
          <path d="M128 -64h26l18 22v26h-44z" fill="#ff6b0f" />
          <path d="M134 -58h18l12 16h-30z" fill="#9fd0ff" />
          <rect x="0" y="-18" width="172" height="6" fill="#3a4a6e" />
          <g className="wheel" data-cx="30" transform="rotate(132.23076923076923 30 -8)" ref={bind("wheels:0")}>
            <circle cx="30" cy="-8" r="13" fill="#0b0f18" />
            <circle cx="30" cy="-8" r="5" fill="#8e9ab2" />
            <path d="M30 -16v16M22 -8h16" stroke="#56627d" strokeWidth="2" />
          </g>
          <g className="wheel" data-cx="142" transform="rotate(132.23076923076923 142 -8)" ref={bind("wheels:1")}>
            <circle cx="142" cy="-8" r="13" fill="#0b0f18" />
            <circle cx="142" cy="-8" r="5" fill="#8e9ab2" />
            <path d="M142 -16v16M134 -8h16" stroke="#56627d" strokeWidth="2" />
          </g>
          <g id="lorrycount" opacity="0" ref={bind("lorrycount")}>
            <circle cx="118" cy="-86" r="13" fill="#22c38e" />
            <text id="lorrycountt" x="118" y="-81" textAnchor="middle" fontWeight="800" fontSize="14" fill="#06281c" ref={bind("lorrycountt")}>{t.story.labels.emptyLorry}</text>
          </g>
        </g>
        <use id="f0" href="#box" opacity="0" ref={bind("f0", "fb:0")} />
        <use id="f1" href="#box" opacity="0" ref={bind("f1", "fb:1")} />
        <use id="f2" href="#box" opacity="0" ref={bind("f2", "fb:2")} />
        <g id="badges" ref={bind("badges")}>
          <g opacity="0" transform="translate(346,262) scale(0.001)" ref={bind("grn")}>
            <rect x="-95" y="-12" width="190" height="24" rx="12" fill="#0f3a2b" stroke="#22c38e" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontWeight="700" fontSize="11" fill="#4fe0ad">{t.story.labels.goodsReceived}</text>
          </g>
          <g opacity="0" transform="translate(640,212) scale(0.001)" ref={bind("promos:0")}>
            <rect x="-44" y="-12" width="88" height="24" rx="12" fill="#3a2a10" stroke="#ffb23e" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontWeight="700" fontSize="11" fill="#ffb23e">{t.story.labels.multiBuy}</text>
          </g>
          <g opacity="0" transform="translate(735,212) scale(0.001)" ref={bind("promos:1")}>
            <rect x="-44" y="-12" width="88" height="24" rx="12" fill="#3a2a10" stroke="#ffb23e" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontWeight="700" fontSize="11" fill="#ffb23e">{t.story.labels.biscuits}</text>
          </g>
          <g opacity="0" transform="translate(830,212) scale(0.001)" ref={bind("promos:2")}>
            <rect x="-44" y="-12" width="88" height="24" rx="12" fill="#3a2a10" stroke="#ffb23e" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontWeight="700" fontSize="11" fill="#ffb23e">{t.story.labels.voucher}</text>
          </g>
          <g opacity="0" transform="translate(640,212) scale(0.001)" ref={bind("paids:0")}>
            <rect x="-35" y="-12" width="70" height="24" rx="12" fill="#0f3a2b" stroke="#22c38e" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontWeight="700" fontSize="11" fill="#4fe0ad">{t.story.labels.paid}</text>
          </g>
          <g opacity="0" transform="translate(735,212) scale(0.001)" ref={bind("paids:1")}>
            <rect x="-35" y="-12" width="70" height="24" rx="12" fill="#0f3a2b" stroke="#22c38e" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontWeight="700" fontSize="11" fill="#4fe0ad">{t.story.labels.paid}</text>
          </g>
          <g opacity="0" transform="translate(830,212) scale(0.001)" ref={bind("paids:2")}>
            <rect x="-35" y="-12" width="70" height="24" rx="12" fill="#0f3a2b" stroke="#22c38e" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontWeight="700" fontSize="11" fill="#4fe0ad">{t.story.labels.paid}</text>
          </g>
          <g opacity="0" transform="translate(500,176) scale(0.001)" ref={bind("low")}>
            <rect x="-85" y="-12" width="170" height="24" rx="12" fill="#3a1218" stroke="#f0455a" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontWeight="700" fontSize="11" fill="#ff8a98">{t.story.labels.lowStock}</text>
          </g>
          <g opacity="0" transform="translate(120,150) scale(0.001)" ref={bind("po")}>
            <rect x="-65" y="-12" width="130" height="24" rx="12" fill="#241a44" stroke="#a78bfa" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontWeight="700" fontSize="11" fill="#c9b8ff">{t.story.labels.purchaseOrder}</text>
          </g>
          <g opacity="0" transform="translate(1075,320) scale(0.001)" ref={bind("sync")}>
            <rect x="-70" y="-12" width="140" height="24" rx="12" fill="#0b2240" stroke="#5aa8ff" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontWeight="700" fontSize="11" fill="#9fd0ff">{t.story.labels.synced}</text>
          </g>
          <g opacity="0" transform="translate(684,276) scale(0.001)" ref={bind("pays:0")}>
            <rect x="-11" y="-8" width="22" height="15" rx="2" fill="#5aa8ff" />
            <rect x="-11" y="-4" width="22" height="3" fill="#0b2240" />
          </g>
          <g opacity="0" transform="translate(779,276) scale(0.001)" ref={bind("pays:1")}>
            <rect x="-12" y="-7" width="24" height="14" rx="2" fill="#22c38e" />
            <circle cx="0" cy="0" r="4" fill="#0f3a2b" />
          </g>
          <g opacity="0" transform="translate(874,276) scale(0.001)" ref={bind("pays:2")}>
            <rect x="-13" y="-8" width="26" height="16" rx="3" fill="#a78bfa" />
            <text x="0" y="4" textAnchor="middle" fontWeight="800" fontSize="9" fill="#160830">{t.story.labels.credit}</text>
          </g>
          <g opacity="0" ref={bind("pk:0")}>
            <rect x="-14" y="-10" width="28" height="20" rx="4" fill="#ff6b0f" />
            <path d="M-10 -6 L0 3 L10 -6" stroke="#160800" strokeWidth="2.2" fill="none" />
          </g>
          <g opacity="0" ref={bind("pk:1")}>
            <rect x="-14" y="-10" width="28" height="20" rx="4" fill="#ff6b0f" />
            <path d="M-10 -6 L0 3 L10 -6" stroke="#160800" strokeWidth="2.2" fill="none" />
          </g>
          <g opacity="0" ref={bind("pk:2")}>
            <rect x="-14" y="-10" width="28" height="20" rx="4" fill="#ff6b0f" />
            <path d="M-10 -6 L0 3 L10 -6" stroke="#160800" strokeWidth="2.2" fill="none" />
          </g>
          <g opacity="0" ref={bind("pkb2")}>
            <rect x="-14" y="-10" width="28" height="20" rx="4" fill="#22c38e" />
            <path d="M-10 -6 L0 3 L10 -6" stroke="#160800" strokeWidth="2.2" fill="none" />
          </g>
          <g opacity="0" ref={bind("pkb3")}>
            <rect x="-14" y="-10" width="28" height="20" rx="4" fill="#8b7bff" />
            <path d="M-10 -6 L0 3 L10 -6" stroke="#160800" strokeWidth="2.2" fill="none" />
          </g>
          <g opacity="0" ref={bind("pkpo")}>
            <rect x="-14" y="-10" width="28" height="20" rx="4" fill="#a78bfa" />
            <path d="M-10 -6 L0 3 L10 -6" stroke="#160800" strokeWidth="2.2" fill="none" />
          </g>
        </g>
      </g>
    </svg>
  );
}

