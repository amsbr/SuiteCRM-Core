<?php

namespace SuiteCRM\Core\Legacy\UserPreferences;

use SuiteCRM\Core\Legacy\DateTimeHandler;

class TimeFormatPreferenceMapper implements UserPreferencesMapperInterface
{

    /**
     * @var DateTimeHandler
     */
    private $dateTimeHandler;

    /**
     * TimeFormatPreferenceMapper constructor.
     * @param DateTimeHandler $dateTimeHandler
     */
    public function __construct(DateTimeHandler $dateTimeHandler)
    {

        $this->dateTimeHandler = $dateTimeHandler;
    }

    /**
     * @inheritDoc
     */
    public function getKey(): string
    {
        return 'timef';
    }

    /**
     * @inheritDoc
     */
    public function map($value)
    {
        if (empty($value)) {
            return $value;
        }

        return $this->dateTimeHandler->mapFormat($value);
    }
}
