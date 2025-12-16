"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconWriting } from "@tabler/icons-react";
import { toast } from "sonner";

const roles = [
  { title: "Software Engineer", company: "Mastercard", link: null },
  { title: "Co-Founder", company: "OccupAI", link: "https://occupai.us" },
  { title: "CS Alumnus", company: "WashU '25", link: null },
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  const handleClick = async () => {
    navigator.clipboard.writeText("jayce@occupai.us");
    toast.success("Copied jayce@occupai.us to clipboard!");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentRole = roles[roleIndex];

  return (
    <section className="flex items-center justify-center px-4 h-screen overflow-y-hidden">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-6 md:gap-12">
        {/* Headshot */}
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/20 blur-2xl rounded-3xl" />
            <Image
              src="/images/headshot.jpg"
              alt="Jayce Bordelon"
              width={240}
              height={240}
              className="relative rounded-2xl w-60 h-auto"
              priority
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="text-center md:text-left">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Jayce Bordelon
          </motion.h1>

          {/* Animated Role */}
          <motion.div
            className="mt-2 h-7 sm:h-8 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                className="text-base sm:text-xl text-muted-foreground"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentRole.link ? (
                  <Link
                    href={currentRole.link}
                    target="_blank"
                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    {currentRole.company}
                  </Link>
                ) : (
                  <span className="text-foreground">{currentRole.company}</span>
                )}
                {" ┃ "} {currentRole.title}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.p
            className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-background max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
          Working on scalable cloud infrastructure for payments and AI-powered automation.        
          </motion.p>

          {/* Links */}
          <motion.div
            className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center md:justify-around gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleClick} size="icon" className="cursor-pointer">
                    <IconMail className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy email</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" asChild className="cursor-pointer">
                    <Link href="https://occupai.us" target="_blank">
                      <Image width={24} height={24} src="/images/occy.png" alt="occy" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>OccupAI</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" asChild className="cursor-pointer">
                    <Link href="https://github.com/JayceBordelon" target="_blank">
                      <IconBrandGithub className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>GitHub</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" asChild className="cursor-pointer">
                    <Link href="https://linkedin.com/in/JayceBordelon" target="_blank">
                      <IconBrandLinkedin className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>LinkedIn</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" asChild className="cursor-pointer">
                    <Link href="https://jayceb.blog" target="_blank">
                      <IconWriting className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Blog</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </div>
      </div>
    </section>
  );
}