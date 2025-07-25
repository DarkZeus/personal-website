<template>
  <div class="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.02] pointer-events-none" aria-hidden="true"></div>
  <div class="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" aria-hidden="true"></div>

  <div>
    <HeroSection class="py-24" role="banner">
      
      <template #title>About Me</template>
      <template #description>
        A passionate developer with a focus on creating beautiful, functional, and user-friendly applications.
      </template>
    </HeroSection>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Quick Overview Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <!-- Card 1 -->
        <div class="bg-surface rounded-2xl shadow-card p-8 flex flex-col items-start gap-4">
          <CodeBracketIcon class="w-7 h-7 text-primary" />
          <h3 class="text-2xl font-semibold text-text">Frontend Expert</h3>
          <p class="text-text-light text-base">7+ years of experience with React and Vue ecosystems.</p>
        </div>
        <!-- Card 2 -->
        <div class="bg-surface rounded-2xl shadow-card p-8 flex flex-col items-start gap-4">
          <BoltIcon class="w-7 h-7 text-primary" />
          <h3 class="text-2xl font-semibold text-text">Performance Focus</h3>
          <p class="text-text-light text-base">Building fast, responsive, and scalable applications.</p>
        </div>
        <!-- Card 3 -->
        <div class="bg-surface rounded-2xl shadow-card p-8 flex flex-col items-start gap-4">
          <UsersIcon class="w-7 h-7 text-primary" />
          <h3 class="text-2xl font-semibold text-text">Team Player</h3>
          <p class="text-text-light text-base">Strong communication and collaboration skills.</p>
        </div>
        <!-- Card 4 -->
        <div class="bg-surface rounded-2xl shadow-card p-8 flex flex-col items-start gap-4">
          <PuzzlePieceIcon class="w-7 h-7 text-primary" />
          <h3 class="text-2xl font-semibold text-text">Problem Solver</h3>
          <p class="text-text-light text-base">Architecting efficient and maintainable solutions.</p>
        </div>
      </div>

      <!-- About Content -->
      <section class="py-12 relative overflow-hidden" role="main" aria-label="About content">        
        <div class="grid gap-16 lg:grid-cols-2">
          <!-- Left Column -->
          <div class="space-y-8" role="complementary" aria-label="Personal information">
            <div class="bg-surface rounded-lg shadow-card p-8 relative overflow-hidden">
              <!-- Decorative corner -->
              <div class="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full" aria-hidden="true"></div>
              <h2 class="text-3xl font-display font-semibold text-text mb-6 text-balance relative inline-block" id="about-me">
                Who I Am
                <span class="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary/20" aria-hidden="true"></span>
              </h2>
              <p class="text-lg text-text-light leading-relaxed text-pretty" aria-labelledby="about-me">
                Experienced Software Engineer with 7+ years architecting scalable web solutions and leading technical decision-making in complex environments. Expert in
              <span class="inline-flex items-center gap-1.5 -mt-4 px-4 py-0.5 rounded-full text-sm border bg-[#61DAFB]/10 border border-[#61DAFB]">
                <svg class="w-4 h-4" viewBox="0 0 569 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g fill="none" fill-rule="evenodd">
                        <g fill="#087EA4" fill-rule="nonzero">
                            <path d="M285.5,201 C255.400481,201 231,225.400481 231,255.5 C231,285.599519 255.400481,310 285.5,310 C315.599519,310 340,285.599519 340,255.5 C340,225.400481 315.599519,201 285.5,201" id="Path"></path>
                            <path d="M568.959856,255.99437 C568.959856,213.207656 529.337802,175.68144 466.251623,150.985214 C467.094645,145.423543 467.85738,139.922107 468.399323,134.521063 C474.621631,73.0415145 459.808523,28.6686204 426.709856,9.5541429 C389.677085,-11.8291748 337.36955,3.69129898 284.479928,46.0162134 C231.590306,3.69129898 179.282771,-11.8291748 142.25,9.5541429 C109.151333,28.6686204 94.3382249,73.0415145 100.560533,134.521063 C101.102476,139.922107 101.845139,145.443621 102.708233,151.02537 C97.4493791,153.033193 92.2908847,155.161486 87.3331099,157.39017 C31.0111824,182.708821 0,217.765415 0,255.99437 C0,298.781084 39.6220545,336.307301 102.708233,361.003527 C101.845139,366.565197 101.102476,372.066633 100.560533,377.467678 C94.3382249,438.947226 109.151333,483.32012 142.25,502.434597 C153.629683,508.887578 166.52439,512.186771 179.603923,511.991836 C210.956328,511.991836 247.567589,495.487529 284.479928,465.972527 C321.372196,495.487529 358.003528,511.991836 389.396077,511.991836 C402.475265,512.183856 415.36922,508.884856 426.75,502.434597 C459.848667,483.32012 474.661775,438.947226 468.439467,377.467678 C467.897524,372.066633 467.134789,366.565197 466.291767,361.003527 C529.377946,336.347457 569,298.761006 569,255.99437 M389.155214,27.1025182 C397.565154,26.899606 405.877839,28.9368502 413.241569,33.0055186 C436.223966,46.2772304 446.540955,82.2775015 441.522965,131.770345 C441.181741,135.143488 440.780302,138.556788 440.298575,141.990165 C414.066922,134.08804 387.205771,128.452154 360.010724,125.144528 C343.525021,103.224055 325.192524,82.7564475 305.214266,63.9661533 C336.586743,39.7116483 366.032313,27.1025182 389.135142,27.1025182 M378.356498,310.205598 C368.204912,327.830733 357.150626,344.919965 345.237759,361.405091 C325.045049,363.479997 304.758818,364.51205 284.459856,364.497299 C264.167589,364.51136 243.888075,363.479308 223.702025,361.405091 C211.820914,344.919381 200.80007,327.83006 190.683646,310.205598 C180.532593,292.629285 171.306974,274.534187 163.044553,255.99437 C171.306974,237.454554 180.532593,219.359455 190.683646,201.783142 C200.784121,184.229367 211.770999,167.201087 223.601665,150.764353 C243.824636,148.63809 264.145559,147.579168 284.479928,147.591877 C304.772146,147.579725 325.051559,148.611772 345.237759,150.68404 C357.109048,167.14607 368.136094,184.201112 378.27621,201.783142 C388.419418,219.363718 397.644825,237.458403 405.915303,255.99437 C397.644825,274.530337 388.419418,292.625022 378.27621,310.205598 M419.724813,290.127366 C426.09516,307.503536 431.324985,325.277083 435.380944,343.334682 C417.779633,348.823635 399.836793,353.149774 381.668372,356.285142 C388.573127,345.871232 395.263781,335.035679 401.740334,323.778483 C408.143291,312.655143 414.144807,301.431411 419.805101,290.207679 M246.363271,390.377981 C258.848032,391.140954 271.593728,391.582675 284.5,391.582675 C297.406272,391.582675 310.232256,391.140954 322.737089,390.377981 C310.880643,404.583418 298.10766,417.997563 284.5,430.534446 C270.921643,417.999548 258.18192,404.585125 246.363271,390.377981 Z M187.311556,356.244986 C169.137286,353.123646 151.187726,348.810918 133.578912,343.334682 C137.618549,325.305649 142.828222,307.559058 149.174827,290.207679 C154.754833,301.431411 160.736278,312.655143 167.239594,323.778483 C173.74291,334.901824 180.467017,345.864539 187.311556,356.285142 M149.174827,221.760984 C142.850954,204.473938 137.654787,186.794745 133.619056,168.834762 C151.18418,163.352378 169.085653,159.013101 187.211197,155.844146 C180.346585,166.224592 173.622478,176.986525 167.139234,188.210257 C160.65599,199.433989 154.734761,210.517173 149.074467,221.760984 M322.616657,121.590681 C310.131896,120.827708 297.3862,120.385987 284.379568,120.385987 C271.479987,120.385987 258.767744,120.787552 246.242839,121.590681 C258.061488,107.383537 270.801211,93.9691137 284.379568,81.4342157 C297.99241,93.9658277 310.765727,107.380324 322.616657,121.590681 Z M401.70019,188.210257 C395.196875,176.939676 388.472767,166.09743 381.527868,155.68352 C399.744224,158.819049 417.734224,163.151949 435.380944,168.654058 C431.331963,186.680673 426.122466,204.426664 419.785029,221.781062 C414.205023,210.55733 408.203506,199.333598 401.720262,188.230335 M127.517179,131.790423 C122.438973,82.3176579 132.816178,46.2973086 155.778503,33.0255968 C163.144699,28.9632474 171.455651,26.9264282 179.864858,27.1225964 C202.967687,27.1225964 232.413257,39.7317265 263.785734,63.9862316 C243.794133,82.7898734 225.448298,103.270812 208.949132,125.204763 C181.761691,128.528025 154.90355,134.14313 128.661281,141.990165 C128.199626,138.556788 127.778115,135.163566 127.456963,131.790423 M98.4529773,182.106474 C101.54406,180.767925 104.695358,179.429376 107.906872,178.090828 C114.220532,204.735668 122.781793,230.7969 133.498624,255.99437 C122.761529,281.241316 114.193296,307.357063 107.8868,334.058539 C56.7434387,313.076786 27.0971497,284.003505 27.0971497,255.99437 C27.0971497,229.450947 53.1907013,202.526037 98.4529773,182.106474 Z M155.778503,478.963143 C132.816178,465.691432 122.438973,429.671082 127.517179,380.198317 C127.838331,376.825174 128.259842,373.431953 128.721497,369.978497 C154.953686,377.878517 181.814655,383.514365 209.009348,386.824134 C225.500295,408.752719 243.832321,429.233234 263.805806,448.042665 C220.069,481.834331 180.105722,492.97775 155.838719,478.963143 M441.502893,380.198317 C446.520883,429.691161 436.203894,465.691432 413.221497,478.963143 C388.974566,493.017906 348.991216,481.834331 305.274481,448.042665 C325.241364,429.232737 343.566681,408.752215 360.050868,386.824134 C387.245915,383.516508 414.107066,377.880622 440.338719,369.978497 C440.820446,373.431953 441.221885,376.825174 441.563109,380.198317 M461.193488,334.018382 C454.869166,307.332523 446.294494,281.231049 435.561592,255.99437 C446.289797,230.744081 454.857778,204.629101 461.173416,177.930202 C512.216417,198.911955 541.942994,227.985236 541.942994,255.99437 C541.942994,284.003505 512.296705,313.076786 461.153344,334.058539" id="Shape"></path>
                        </g>
                    </g>
                </svg>
                React
              </span>
              and
              <span class="inline-flex items-center gap-1.5 -mt-4 px-4 py-0.5 rounded-full text-sm bg-[#41B883]/10 border border-[#41B883]">
                <svg class="w-4 h-4" viewBox="0 0 256 221" width="256" height="221" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z" fill="#41B883"/><path d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z" fill="#41B883"/><path d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z" fill="#35495E"/></svg>
                Vue
              </span>
              ecosystems with deep focus on performance optimization and system architecture. Proven ability to drive platform modernization, reduce technical debt, and collaborate across design and product teams to deliver user-focused solutions that improve developer productivity and business outcomes.
              </p>
            </div>

            <div class="bg-surface rounded-lg shadow-card p-8 relative overflow-hidden">
              <!-- Decorative corner -->
              <div class="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full"></div>
              <h2 class="text-3xl font-display font-semibold text-text mb-6 text-balance relative inline-block">
                My Skills
                <span class="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary/20"></span>
              </h2>
              <div class="space-y-6">
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4 text-balance">Frontend Development</h3>
                  <div class="flex flex-wrap gap-2" role="list" aria-label="Frontend Development skills">
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript (ES6+)</a></template>
                    </SkillTag>
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content><a href="https://www.typescriptlang.org/">TypeScript</a></template>
                    </SkillTag>
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content><a href="https://developer.mozilla.org/en-US/docs/Web/HTML">HTML5</a></template>
                    </SkillTag>
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content><a href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS3/SCSS/BEM</a></template>
                    </SkillTag>
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content><a href="https://react.dev/">React</a></template>
                    </SkillTag>
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content><a href="https://redux-toolkit.js.org/">Redux (RTK)</a></template>
                    </SkillTag>
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content><a href="https://vuejs.org/">Vue.js 2/3</a></template>
                    </SkillTag>
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content><a href="https://pinia.vuejs.org/">Pinia</a></template>
                    </SkillTag>
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content><a href="https://router.vuejs.org/">Vue Router</a></template>
                    </SkillTag>
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content><a href="https://zustand-demo.pmnd.rs/">Zustand</a></template>
                    </SkillTag>
                    <SkillTag class="text-pretty" role="listitem">
                      <template #content><a href="https://tanstack.com/">TanStack (Query, Router, Store)</a></template>
                    </SkillTag>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4 text-balance">Backend Development</h3>
                  <div class="flex flex-wrap gap-2" role="list" aria-label="Backend Development skills">
                    <SkillTag role="listitem">
                      <template #content><a href="https://nodejs.org/">Node.js (Hono, Express, NestJS)</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://bun.sh/">Bun</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://laravel.com/">PHP (Laravel)</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.python.org/">Python (FastAPI, Django, Flask)</a></template>
                    </SkillTag>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4 text-balance">Full-Stack Frameworks</h3>
                  <div class="flex flex-wrap gap-2" role="list" aria-label="Full-Stack Framework skills">
                    <SkillTag role="listitem">
                      <template #content><a href="https://tanstack.com/start">TanStack Start</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://nextjs.org/">Next.js</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://nuxt.com/">Nuxt</a></template>
                    </SkillTag>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4 text-balance">UI Libraries & Design</h3>
                  <div class="flex flex-wrap gap-2" role="list" aria-label="UI Libraries and Design skills">
                    <SkillTag role="listitem">
                      <template #content><a href="https://mui.com/">Material UI</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://tailwindcss.com/">TailwindCSS</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://ui.shadcn.com/">Shadcn/UI</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://chakra-ui.com/">Chakra UI</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://ui.nuxt.com/">Nuxt UI</a></template>
                    </SkillTag>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4 text-balance">Build Tools</h3>
                  <div class="flex flex-wrap gap-2" role="list" aria-label="Build Tools skills">
                    <SkillTag role="listitem">
                      <template #content><a href="https://webpack.js.org/">Webpack</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://vitejs.dev/">Vite</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.npmjs.com/">npm/yarn</a></template>
                    </SkillTag>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4 text-balance">Testing</h3>
                  <div class="flex flex-wrap gap-2" role="list" aria-label="Testing skills">
                    <SkillTag role="listitem">
                      <template #content><a href="https://enzymejs.github.io/enzyme/">Enzyme</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://jestjs.io/">Jest</a></template>
                    </SkillTag>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4 text-balance">Databases</h3>
                  <div class="flex flex-wrap gap-2" role="list" aria-label="Database skills">
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.postgresql.org/">PostgreSQL</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.mysql.com/">MySQL</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.sqlite.org/">SQLite</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://redis.io/">Redis</a></template>
                    </SkillTag>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4 text-balance">DevOps & Tools</h3>
                  <div class="flex flex-wrap gap-2" role="list" aria-label="DevOps and Tools skills">
                    <SkillTag role="listitem">
                      <template #content><a href="https://git-scm.com/">Git</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.linux.org/">Linux</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://nginx.org/">Nginx</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://httpd.apache.org/">Apache HTTP</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.docker.com/">Docker (basic)</a></template>
                    </SkillTag>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4 text-balance">Cloud & Infrastructure</h3>
                  <div class="flex flex-wrap gap-2" role="list" aria-label="Cloud and Infrastructure skills">
                    <SkillTag role="listitem">
                      <template #content><a href="https://vercel.com/">Vercel</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.netlify.com/">Netlify</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://aws.amazon.com/">Amazon Web Services (EC2, S3)</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.cloudflare.com/">Cloudflare (D1, R2, KV, DNS, CDN)</a></template>
                    </SkillTag>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4 text-balance">Professional Tools</h3>
                  <div class="flex flex-wrap gap-2" role="list" aria-label="Professional Tools skills">
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.figma.com/">Figma</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.adobe.com/products/photoshop.html">Adobe Photoshop</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.jetbrains.com/">JetBrains IDEs</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.atlassian.com/software/jira">Jira</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.atlassian.com/software/confluence">Confluence</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.notion.so/">Notion</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://slack.com/">Slack</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.postman.com/">Postman</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://insomnia.rest/">Insomnia</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://yaak.ai/">Yaak</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://tableplus.com/">TablePlus</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.pgadmin.org/">pgAdmin</a></template>
                    </SkillTag>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text mb-4 text-balance">AI & ML</h3>
                  <div class="flex flex-wrap gap-2" role="list" aria-label="AI and ML skills">
                    <SkillTag role="listitem">
                      <template #content><a href="https://ollama.ai/">Ollama (self-hosted models)</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://openai.com/chatgpt">ChatGPT</a>/<a href="https://claude.ai/">Claude</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://openrouter.ai/">OpenRouter</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://github.com/CompVis/stable-diffusion">Stable Diffusion 1.6 (LoRA, upscalers, VAE)</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://www.promptingguide.ai/">Prompt Engineering</a></template>
                    </SkillTag>
                    <SkillTag role="listitem">
                      <template #content><a href="https://github.com/features/copilot">AI-powered development workflows</a></template>
                    </SkillTag>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-8" role="complementary" aria-label="Professional experience">
            <div class="bg-surface rounded-lg shadow-card p-8 relative overflow-hidden">
              <!-- Decorative corner -->
              <div class="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full" aria-hidden="true"></div>
              <h2 class="text-3xl font-display font-semibold text-text mb-6 text-balance relative inline-block" id="experience">
                Experience
                <span class="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary/20" aria-hidden="true"></span>
              </h2>
              <div class="space-y-8" role="list" aria-labelledby="experience">
                <div class="relative pl-8" role="listitem">
                  <div class="absolute left-0 top-3 w-2 h-2 rounded-sm bg-primary" aria-hidden="true"></div>
                  <div class="absolute left-1 top-4 bottom-0 w-px bg-primary/20" aria-hidden="true"></div>
                  <div>
                    <h3 class="text-xl font-semibold text-text text-balance">Middle Software Engineer (Web & Mobile)</h3>
                    <p class="text-text-light text-pretty">LeverX, Kyiv</p>
                    <p class="text-sm text-text-light/80 text-pretty">Oct 2021 – Dec 2024 (3 years, 2 months)</p>
                    <ul class="mt-4 space-y-2 text-text-light" role="list" aria-label="Key responsibilities and achievements">
                      <li class="flex items-start gap-2 text-pretty">
                        <span class="text-primary">•</span>
                        Researched and delivered proof-of-concept offline-first architecture using IndexedDB, enabling critical functionality during network outages and informing long-term technical strategy
                      </li>
                      <li class="flex items-start gap-2 text-pretty">
                        <span class="text-primary">•</span>
                        Led performance optimization initiative for data visualization components, collaborating across design and product teams to deliver 50% rendering improvements through strategic technical analysis and cross-functional alignment
                      </li>
                      <li class="flex items-start gap-2 text-pretty">
                        <span class="text-primary">•</span>
                        Drove standardization of core table architecture, eliminating performance bottlenecks and establishing reusable patterns that accelerated team velocity and improved developer productivity across multiple product areas
                      </li>
                      <li class="flex items-start gap-2 text-pretty">
                        <span class="text-primary">•</span>
                        Spearheaded platform modernization efforts including Webpack-to-Vite migration (achieving 60% build time reduction), React/Material UI framework upgrades, and Vue 2-to-3 architectural transition, ensuring technical debt reduction and developer experience improvements
                      </li>
                      <li class="flex items-start gap-2 text-pretty">
                        <span class="text-primary">•</span>
                        Designed and implemented client-side data processing solution, enabling advanced filtering and pagination capabilities for locally cached data and reducing dependency on server-side operations
                      </li>
                    </ul>
                    <div class="mt-4 flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                      <SkillTag role="listitem"><template #content>React</template></SkillTag>
                      <SkillTag role="listitem"><template #content>Redux</template></SkillTag>
                      <SkillTag role="listitem"><template #content>SCSS</template></SkillTag>
                      <SkillTag role="listitem"><template #content>Material UI</template></SkillTag>
                      <SkillTag role="listitem"><template #content>Vue 2</template></SkillTag>
                      <SkillTag role="listitem"><template #content>Vuex</template></SkillTag>
                      <SkillTag role="listitem"><template #content>Vue 3</template></SkillTag>
                      <SkillTag role="listitem"><template #content>TypeScript</template></SkillTag>
                      <SkillTag role="listitem"><template #content>Pinia</template></SkillTag>
                      <SkillTag role="listitem"><template #content>Nuxt 3</template></SkillTag>
                      <SkillTag role="listitem"><template #content>RESTful APIs</template></SkillTag>
                      <SkillTag role="listitem"><template #content>CI/CD pipeline</template></SkillTag>
                      <SkillTag role="listitem"><template #content>GitHub</template></SkillTag>
                      <SkillTag role="listitem"><template #content>GitHub Actions</template></SkillTag>
                      <SkillTag role="listitem"><template #content>AWS</template></SkillTag>
                      <SkillTag role="listitem"><template #content>Azure DevOps</template></SkillTag>
                      <SkillTag role="listitem"><template #content>Azure Blob Storage</template></SkillTag>
                    </div>
                    <p class="mt-4 text-sm text-text-light/80 italic">Client projects completed under confidentiality agreements</p>
                  </div>
                </div>

                <div class="relative pl-8">
                  <div class="absolute left-0 top-3 w-2 h-2 rounded-sm bg-primary"></div>
                  <div class="absolute left-1 top-4 bottom-0 w-px bg-primary/20"></div>
                  <div>
                    <h3 class="text-xl font-semibold text-text">Software Engineer</h3>
                    <p class="text-text-light">PJSC Chernihivoblenergo</p>
                    <p class="text-sm text-text-light/80">Dec 2018 – Sep 2021 (2 years, 9 months)</p>
                    <p class="mt-4 text-text-light">Architected and delivered web platform for regional electrical distribution company, supporting critical business operations including HR management, asset inventory, and service coordination. Developed full-stack solutions using Laravel and Vue 2 that enabled efficient management of infrastructure serving residential and commercial customers across Chernihiv region.</p>
                    <div class="mt-4 flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">Laravel</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">Vue 2</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">PostgreSQL</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">MySQL</span>
                    </div>
                  </div>
                </div>

                <div class="relative pl-8">
                  <div class="absolute left-0 top-3 w-2 h-2 rounded-sm bg-primary"></div>
                  <div class="absolute left-1 top-4 bottom-0 w-px bg-primary/20"></div>
                  <div>
                    <h3 class="text-xl font-semibold text-text">Web Developer</h3>
                    <p class="text-text-light">Freelance</p>
                    <p class="text-sm text-text-light/80">Jan 2017 – Aug 2018 (1 year, 8 months)</p>
                    <p class="mt-4 text-text-light">Delivered frontend solutions across diverse client projects, focusing on user experience optimization and responsive interface design.</p>
                    <div class="mt-4 flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">HTML/CSS</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">JavaScript</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">jQuery</span>
                      <span class="px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary" role="listitem">Vue 2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-surface rounded-lg shadow-card p-8 relative overflow-hidden">
              <!-- Decorative corner -->
              <div class="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full"></div>
              <h2 class="text-3xl font-display font-semibold text-text mb-6 text-balance relative inline-block">
                Education
                <span class="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary/20"></span>
              </h2>
              <div class="flex items-start gap-4" role="list" aria-label="Education details">
                <div class="w-12 h-12 min-w-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-text">Bachelor's Degree in Mathematical Modeling and Cybersecurity</h3>
                  <p class="text-sm text-text-light/80">2017 - 2021</p>
                  <p class="text-text-light">Chernihiv Polytechnic National University, Ukraine</p>
                </div>
              </div>

              <h2 class="text-3xl font-display font-semibold text-text mt-10 mb-6 text-balance relative inline-block">
                MOOC & Certifications
                <span class="absolute -bottom-2 left-0 w-16 h-0.5 bg-primary/20"></span>
              </h2>
              <div class="flex items-start gap-4" role="list" aria-label="MOOC and certification details">
                <div class="w-12 h-12 min-w-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="flex flex-col space-y-4">
                  <div>
                    <h3 class="text-xl font-semibold text-text">The Last Algorithms Course You'll Need</h3>
                    <p class="space-x-3"><span class="text-text-light">Michael Paulson, FrontendMasters</span><span class="text-sm text-text-light/80">Jul 2025</span></p>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold text-text">Animations on the Web</h3>
                    <p class="space-x-3"><span class="text-text-light">Emil Kowalski</span><span class="text-sm text-text-light/80">Feb 2025</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import HeroSection from '~/components/sections/hero-section.vue'
import SkillTag from '~/components/ui/skill-tag.vue'
import { CodeBracketIcon, BoltIcon, UsersIcon, PuzzlePieceIcon } from '@heroicons/vue/24/outline'
</script> 
