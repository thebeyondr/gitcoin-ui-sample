"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpRight,
  CheckCircle,
  Trash2,
  Wallet,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface Project {
  id: string;
  name: string;
  description: string;
  logo: string;
  donationAmount: number;
  estimatedMatch: number;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "growthepie",
    description:
      "growthepie is a public goods data platform designed specifically for the Ethereum ecosystem to understand which chains, apps and m",
    logo: "/logo.png",
    donationAmount: 2,
    estimatedMatch: 0,
  },
  {
    id: "2",
    name: "web3.py",
    description:
      "web3.py is the standard for interacting with the Ethereum blockchain for Python developers. The open source library garners well o",
    logo: "/logo.png",
    donationAmount: 2,
    estimatedMatch: 0,
  },
  {
    id: "3",
    name: "Scaffold-ETH2",
    description:
      "Scaffold-Eth2 is an open-source toolkit for building decentralized applications on the Ethereum blockchain. It's designed to make",
    logo: "/logo.png",
    donationAmount: 2,
    estimatedMatch: 2,
  },
  {
    id: "4",
    name: "Human Passport (formerly Gitcoin Passport)",
    description:
      "Human Passport is the premier web3 native offering that enables ecosystems to protect, understand and organically grow what matter",
    logo: "/logo.png",
    donationAmount: 2,
    estimatedMatch: 0,
  },
  {
    id: "5",
    name: "Ape Framework",
    description:
      "The most advanced smart contract framework on earth Trusted by Yearn, Lido, Curve, and more Ape is a smart contract development to",
    logo: "/logo.png",
    donationAmount: 2,
    estimatedMatch: 0,
  },
  {
    id: "6",
    name: "Open Source Observer",
    description:
      "Open Source Observer builds technology to measure impact in the open. First, we maintain a growing registry of open source softwar",
    logo: "/logo.png",
    donationAmount: 5,
    estimatedMatch: 254.26,
  },
  {
    id: "7",
    name: "EdgeOS",
    description:
      "EdgeOS: The Open Source Stack for Network Societies The popup city and network society space is booming, with thousands of people",
    logo: "/logo.png",
    donationAmount: 5,
    estimatedMatch: 354.64,
  },
  {
    id: "8",
    name: "Lighthouse",
    description:
      "Lighthouse is a perpetual storage protocol built on IPFS and Filecoin that allows users to store data permanently. It's the most p",
    logo: "/logo.png",
    donationAmount: 1,
    estimatedMatch: 27.03,
  },
  {
    id: "9",
    name: "OpenZeppelin Contracts Library",
    description:
      "OpenZeppelin Contracts is the most widely used library for secure and standardized smart contract development in the Ethereum ecos",
    logo: "/logo.png",
    donationAmount: 1,
    estimatedMatch: 20.81,
  },
  {
    id: "10",
    name: "Scaffold-ETH-Mobile",
    description:
      "⚡ Mobile (dApps... ETH Mobile is an open-source toolkit for building decentralized applications (dApps) on Ethereum and othe",
    logo: "/logo.png",
    donationAmount: 2,
    estimatedMatch: 39.9,
  },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateDonationAmount = (projectId: string, amount: number) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, donationAmount: Math.max(0, amount) }
          : project
      )
    );
  };

  const removeProject = (projectId: string) => {
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  const totalDonation = projects.reduce(
    (sum, project) => sum + project.donationAmount,
    0
  );
  const totalMatch = projects.reduce(
    (sum, project) => sum + project.estimatedMatch,
    0
  );

  const connectWallet = () => {
    // Simulate wallet connection
    setIsWalletConnected(true);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                currentStep >= step
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-muted-foreground text-muted-foreground"
              }`}
            >
              {currentStep > step ? <CheckCircle className="w-4 h-4" /> : step}
            </div>
            <span
              className={`ml-2 text-sm tracking-wider font-medium font-mono ${
                currentStep >= step
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step === 1 && "CART"}
              {step === 2 && "VERIFICATION"}
              {step === 3 && "PAYMENT"}
            </span>
            {step < 3 && <div className="w-8 h-px bg-muted-foreground mx-4" />}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCartStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-5xl mb-2">Your impact cart</h2>
        <p className="text-muted-foreground">
          Review and adjust your donations to these impact projects
        </p>
        <p className="text-base bg-blue-50 w-fit mx-auto mt-2 px-2 py-0.5">
          Psst, giving at least $US 1 per campaign will allow us to match your
          donation!
        </p>
      </div>

      <div className="flex items-center gap-2 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Input
            placeholder="Search projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
        <span className="ml-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium whitespace-nowrap">
          {filteredProjects.length} item{filteredProjects.length !== 1 && "s"}
        </span>
      </div>

      <div className="text-sm p-1 rounded-lg bg-blue-50">
        <span>
          💠 Estimated match: This is the amount your donation could be matched
          by the funding pool, based on{" "}
          <Link
            href="https://wtfisqf.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="link" className="p-0 underline text-blue-600">
              quadratic funding
            </Button>
          </Link>
          .
        </span>
      </div>

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
            >
              <Card className="p-4 border-[1.5px] border-transparent hover:border-neutral-400 transition-colors duration-300 bg-neutral-50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0 overflow-hidden ring-1 ring-neutral-200">
                    <Image
                      src={project.logo || "/logo.png"}
                      alt={`${project.name} logo`}
                      className="w-full h-full object-cover"
                      width={40}
                      height={40}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      {/* <div className="flex-1"> */}
                      <div className="flex items-center gap-2 mb-1">
                        <Link
                          href={`/projects/${project.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View project details"
                          className="group font-semibold hover:underline flex items-center gap-1 text-neutral-600 hover:text-neutral-900"
                        >
                          {project.name}
                          <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </Link>
                      </div>
                      {/* <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p> */}
                      {/* </div> */}

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={project.donationAmount}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              updateDonationAmount(
                                project.id,
                                Number.parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-16 text-center"
                            min="0"
                            step="0.01"
                          />
                          <span className="text-sm font-medium">USDC</span>
                        </div>

                        <div className="text-right min-w-[80px]">
                          <div className="text-sm font-medium">
                            ${project.donationAmount.toFixed(2)}
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help text-blue-600 text-sm">
                                💠{project.estimatedMatch.toFixed(2)} USD
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top" align="center">
                              Estimated match: The amount your donation could be
                              matched by the funding pool, based on quadratic
                              funding.
                              <br />
                              <Link
                                href="https://wtfisqf.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-blue-600"
                              >
                                Learn more
                              </Link>
                            </TooltipContent>
                          </Tooltip>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProject(project.id)}
                          className="text-muted-foreground hover:text-destructive group"
                        >
                          <Trash2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Card className="p-6 bg-muted/50">
        <div className="flex justify-between items-center text-lg font-semibold">
          <p>Estimated match total: 💠 ${totalMatch.toFixed(2)}</p>

          <span className="text-blue-500">
            Your total donation: ${totalDonation.toFixed(2)}
          </span>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={() => setCurrentStep(2)}
          disabled={projects.length === 0 || totalDonation === 0}
          size="lg"
        >
          Continue to Verification
        </Button>
      </div>
    </div>
  );

  const renderVerificationStep = () => (
    <div className="text-center space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Human Passport Verification</h2>
        <p className="text-muted-foreground">
          Verify your humanity to proceed with the donation matching program
        </p>
      </div>

      <Card className="p-8">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            Human Passport verification will be implemented here
          </p>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          Back to Cart
        </Button>
        <Button onClick={() => setCurrentStep(3)} size="lg">
          Continue to Payment
        </Button>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Connect Wallet & Pay</h2>
        <p className="text-muted-foreground">
          Connect your wallet to complete your donation
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Donation Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Your donation:</span>
              <span className="font-medium">
                ${totalDonation.toFixed(2)} USDC
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated matching:</span>
              <span className="font-medium text-green-600">
                +${totalMatch.toFixed(2)} USD
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total impact:</span>
              <span>${(totalDonation + totalMatch).toFixed(2)} USD</span>
            </div>
          </div>
        </div>
      </Card>

      {!isWalletConnected ? (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <Wallet className="w-12 h-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your wallet to proceed with the transaction
              </p>
              <Button onClick={connectWallet} size="lg" className="w-full">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <CheckCircle className="w-12 h-12 mx-auto text-green-600" />
            <div>
              <h3 className="font-semibold mb-2">Wallet Connected</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Ready to process your donation of ${totalDonation.toFixed(2)}{" "}
                USDC
              </p>
              <Button size="lg" className="w-full">
                Complete Donation
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(2)}>
          Back to Verification
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {renderStepIndicator()}

        {currentStep === 1 && renderCartStep()}
        {currentStep === 2 && renderVerificationStep()}
        {currentStep === 3 && renderPaymentStep()}
      </div>
    </div>
  );
}
