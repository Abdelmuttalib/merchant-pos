import Image from "next/image";
import { Button, ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site-config";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { sitePaths } from "@/lib/site-paths";
import Seo from "@/components/seo";

export default function Home() {
  return (
    <>
      {/* <Head>
        <title>UTAK Menu</title>
        <meta name="title" content="UTAK Menu" />
        <meta name="description" content="Merchant Restaurant Menu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Seo title="UTAK POS" description="Merchant Restaurant POS" />
      <main className="relative flex h-screen flex-col items-center justify-center bg-gray-800">
        {/* header => nav */}
        <div className="absolute top-0 z-20 flex h-16 w-full items-center justify-between bg-transparent px-20">
          <div className="flex items-center gap-x-6">
            <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
              UTAK
              <span className="font-normal text-gray-300">
                POS
                {/* Securico */}
              </span>
            </h3>
            {/* <span className="text-gray-400">
              POS
            </span> */}
          </div>
          <div className="flex items-center gap-x-10 text-sm text-white">
            {siteConfig.navItems.map((item, i) => (
              <p key={`${item}${i}`}>{item}</p>
            ))}
            <ButtonLink href={sitePaths.dashboard.home}>Dashboard</ButtonLink>
          </div>
        </div>

        <Image
          src="https://images.unsplash.com/photo-1556742393-d75f468bfcb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="POS system"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="opacity-60"
        />
        {/* content */}
        <div className="absolute inset-0 flex h-full w-full items-end justify-end bg-transparent">
          <div className="h-[50%] w-full bg-gradient-to-t from-gray-900 to-transparent">
            <div className="flex flex-col gap-y-10 px-20 text-white">
              <div className="flex w-full items-end justify-between text-balance text-6xl font-semibold tracking-tight">
                <h1 className="max-w-3xl">
                  Streamlined Point of Sale Solutions for Businesses
                  {/* Innovative security solutions for everyone */}
                </h1>
                <p className="relative flex pl-4 pt-6">
                  <span className="absolute left-0 top-0 text-xl text-gray-500">
                    for
                  </span>
                  Retailers
                  {/* Banks */}
                </p>
              </div>
              <hr className="opacity-30" />
              <div>
                <p className="max-w-3xl text-balance font-light text-gray-200">
                  Elevate your business operations with our intuitive Point of
                  Sale (POS) system. Simplify transactions, manage inventory
                  efficiently, and enhance customer experiences seamlessly.
                  {/* Protect your business with out intelligence-Led security guard solutions. Secure your employees, customers & assets against theft and violence. */}
                </p>
              </div>
              <div className="flex h-16 w-full items-center gap-x-2">
                <ButtonLink href={sitePaths.dashboard.home} variant="primary">
                  Get Started
                </ButtonLink>
                <Button variant="dark" className="h-11">
                  Book a Demo
                </Button>
                <div className="ml-4 flex items-center gap-x-1.5 rounded-lg bg-white/[0.1] px-2.5 py-1.5 backdrop-blur">
                  <CheckBadgeIcon className="w-5 text-gray-300" />
                  <p className="whitespace-nowrap text-sm font-normal text-gray-300">
                    Trusted by many businesses
                  </p>
                </div>
                {/* <div className="w-full rounded-lg backdrop-blur bg-white/[0.1] flex items-center justify-between px-4 h-full">
                  <p className="font-extralight text-sm text-gray-300 whitespace-nowrap">Trusted by: </p>
                  <div className="flex justify-evenly w-full">
                    {["https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"].map((src, i) => (
                      <Image key={`${src}${i}`} src={src} alt="POS system" width={70} height={50} className="rounded-lg" />
                    ))}
                  </div>
                </div> */}
                {/* <div className="bg-white px-4 w-full max-w-xs h-full rounded-lg flex items-center gap-x-2">
                  <div className="flex w-full items-center gap-x-2.5">
                    <div className="rounded-full relative bg-red-300 w-10 h-10">
                      <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="POS system" layout="fill" className="rounded-full object-cover object-top" />
                      <span className="absolute right-0 top-0 bg-white p-0.5 rounded-full z-20 flex items-center justify-center">
                        <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                      </span>
                    </div>
                    <div className="text-xs">
                      <p className="text-black">
                        Eric Winston
                      </p>
                      <span className="text-gray-500">
                        Online
                      </span>
                    </div>
                  </div>
                  <Button variant='dark' className="">
                    Contact us
                  </Button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
