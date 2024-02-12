import React from "react";

export function HeroSection() {
  return (
    <div className="flex justify-center items-center h-[88vh] w-full">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 animate-fadeIn delay-150ms"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#88c2fc] to-[#8080ff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:opacity-15"
        />
      </div>
      <div className="opacity-0 animate-fadeIn delay-0ms mx-auto max-w-3xl dark:text-white">
        <div className="text-center">
          <h1
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl opacity-0 animate-fadeIn delay-0ms dark:text-gray-300"
          >
            Site d'information du
          </h1>
          <h1
            className="text-2xl font-bold tracking-tight text-blue-600 sm:text-5xl opacity-0 animate-fadeIn delay-150ms"
          >
            Département de l'Information Médicale
          </h1>
          <h1
            className="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl opacity-0 animate-fadeIn delay-300ms dark:text-gray-300"
          >
            du Centre Hospitalier Spécialisé de SARREGUEMINES
          </h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="connexion"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 animate-fadeIn delay-450ms opacity-0  dark:text-gray-300"
            >
              Commencer
            </a>
            <a
              href="/about"
              className="text-sm font-semibold leading-6 text-gray-900 animate-fadeIn delay-600ms opacity-0 dark:text-gray-300"
            >
              En savoir plus <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] dark:opacity-50"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#8080ff] to-[#88c2fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] dark:opacity-15"
        />
      </div>
    </div>
  );
}
