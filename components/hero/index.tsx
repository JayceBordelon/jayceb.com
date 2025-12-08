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
  { title: "Co-Founder & CTO", company: "OccupAI", link: "https://occupai.us" },
  { title: "Computer Science Alumnus", company: "WashU '25", link: null },
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
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12">
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
              width={280}
              height={280}
              className="relative rounded-2xl object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Content */}
        <div className="text-center md:text-left">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Jayce Bordelon
          </motion.h1>

          {/* Animated Role */}
          <motion.div
            className="mt-2 h-8 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                className="text-xl text-muted-foreground"
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
            className="mt-4 text-muted-background max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Building resilient cloud infrastructure for transaction processing and high-performance AI agents that drive operational intelligence at scale.            
        </motion.p>

          {/* Links */}
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-between w-full md:justify-around"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleClick} className="cursor-pointer">
                    <IconMail className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy email</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button  size="icon" asChild className="cursor-alias">
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
                  <Button  size="icon" asChild className="cursor-alias">
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
                  <Button  size="icon" asChild className="cursor-alias">
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