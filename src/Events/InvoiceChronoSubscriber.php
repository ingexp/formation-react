<?php

namespace App\Events;

use App\Entity\User;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;

class InvoiceChronoSubscriber implements EventSubscriberInterface
{

    private $security;
    private $repository;

    public function __construct(Security $sec, InvoiceRepository $repo){

        $this->security = $sec;
        $this->repository = $repo;

    }

   
    public static function getSubscribedEvents()
    {


        return [
            KernelEvents::VIEW => ['setChronoForInvoice', EventPriorities::PRE_VALIDATE]
        ];

    }

   

    public function setChronoForInvoice(GetResponseForControllerResultEvent $event){

        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        $user = $this->security->getUser();
     
       
        if( $result instanceof Invoice  && $method === "POST" ){

            $result->setChrono($this->repository->findLastChrono($user));

            if(empty($result->getSentAt()) )
                {

                    $result->setSentAt(new \Datetime());

                }

        }


    }



}