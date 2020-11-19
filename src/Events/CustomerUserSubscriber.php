<?php

namespace App\Events;

use App\Entity\Customer;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;

class CustomerUserSubscriber  implements EventSubscriberInterface
{


    private $security;

    public function __construct(Security $sec){

        $this->security = $sec;

    }
    public static function getSubscribedEvents()
    {


        return [
            KernelEvents::VIEW => ['setUserForCustomer', EventPriorities::PRE_VALIDATE]
        ];

    }

    public function setUserForCustomer(GetResponseForControllerResultEvent $event){

        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
       
        $user = $this->security->getUser();
       
        if( $result instanceof Customer  && $method === "POST" ){

            $result->setUser($user);

        }


    }

}